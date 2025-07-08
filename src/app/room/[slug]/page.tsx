"use client";

import { handleEvents } from "../../../canvasUtils/HandleEvents";
import { drawAllShapes } from "../../../canvasUtils/DrawShape";
import React, { useEffect, useRef, useState } from "react";
import { toolType } from "../../../canvasUtils/ToolTypes";
import { displayShapeType } from "../../../canvasUtils/ToolTypes";
import Toolbar from "../../../components/Toolbar";
import { useSocket } from "../../../hooks/useSocket";
import { useParams } from "next/navigation";
import axios from "axios";



const ChatRoom = () => {
  const slug = useParams().slug as string;
    console.log(slug);
  
  const canvasRef = useRef<HTMLCanvasElement | null >(null);
  const ctxRef = useRef<CanvasRenderingContext2D>(null);
  //array to hold the current canvas shapes.
  const shapesRef = useRef<displayShapeType[]>([]);

  //start point of the drawing.
  const startX = useRef(0);
  const startY = useRef(0);

  //last point of the drawing
  const lastX = useRef(0);
  const lastY = useRef(0);

  //drawing or not.
  const mouseDown = useRef(false);

  const [selectedTool, setSelectedTool] = useState<toolType>("rect");
  const currentToolRef = useRef<toolType>("rect");
  const pencilPathRef = useRef<{ x: number; y: number }[]>([]);
  const roomIdRef = useRef<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    currentToolRef.current = selectedTool;
  }, [selectedTool]);

  useEffect(() => {
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.height = canvas.offsetHeight;
    canvas.width = canvas.offsetWidth;
    
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;
    
    ctx.fillStyle = "lightslategray";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const init = async () => {

      console.log("hi there");
      

      await getRoomId(slug, roomIdRef);

      if (!roomIdRef.current) return;
      console.log(roomIdRef.current);

      await getLastMessages(roomIdRef,shapesRef);

      console.log(shapesRef.current);

      drawAllShapes(canvas, shapesRef.current, ctx);

      if(!canvasRef) return

      const ws = useSocket(roomIdRef.current,shapesRef,canvasRef,ctxRef);
      
      if(ws){
        
        wsRef.current = ws

      }

      const cleanupEvents = handleEvents(
        canvas,
        mouseDown,
        startX,
        startY,
        shapesRef,
        ctx,
        currentToolRef,
        lastX,
        lastY,
        pencilPathRef,
        wsRef,
        roomIdRef
      );

      return () => {
    if (ws) {
      ws.close();
    }

    if (cleanupEvents) {
      cleanupEvents();
    }
  };
    };

    init()
  }, []);

  return (
    <div className="h-screen w-screen flex  justify-center items-center overflow-hidden bg-gray-100 ">
      <Toolbar setSelectedTool={setSelectedTool} selectedTool={selectedTool} />
      <canvas ref={canvasRef} className="h-full w-full border-block"></canvas>
    </div>
  );
};

export default ChatRoom;

async function getRoomId(
  slug: string,
  roomIdRef: React.RefObject<string | null>
) {
  try {
    console.log("➡️ Sending request to create room with slug:", slug);
    
    const response = await axios.post(`/api/room/create`, { slug });

    console.log("✅ Got response:", response.data);

    if (!response.data || !response.data.roomId) {
      console.error("❌ roomId missing in response");
      return;
    }

    roomIdRef.current = response.data.roomId;
    console.log("🎯 roomIdRef.current set to:", roomIdRef.current);

  } catch (error) {
    console.error("❌ Error while creating room:", error);
  }
}


const getLastMessages = async (
  roomIdRef: React.RefObject<string | null>,
  shapesRef: React.RefObject<displayShapeType[]>
) => {
  try {
    
    const response = await axios.get(
      `/api/room/get-chat/?id=${roomIdRef.current}`,
    );

    if (!response) return;
    console.log(response);

    const rawShapes = response.data.messages;

    const parsedShapes: displayShapeType[] = rawShapes.map((msg: any) => {
      try {
        const shape = JSON.parse(msg.message);

        if (!shape || typeof shape !== "object") return null;

        switch (shape.type) {
          case "rect":
            return { type: "rect", rect: shape.rect };
          case "circle":
            return { type: "circle", circle: shape.circle };
          case "pencil":
            return { type: "pencil", pencilPath: shape.pencilPath };
          case "line":
            return { type: "line", linePoints: shape.linePoints };
          case "arrow":
            return { type: "arrow", arrowPoints: shape.arrowPoints };
          default:
            return null;
        }
      } catch (err) {
        console.warn("Failed to parse message:", msg.message);
        return null;
      }
    }).filter(Boolean);

    console.log("Parsed shapes from backend:", parsedShapes);

    shapesRef.current = [...shapesRef.current, ...parsedShapes];
  } catch (error) {
    console.log("Error fetching previous shapes:", error);
  }
};

