import React from "react";
import { displayShapeType } from "../canvasUtils/ToolTypes";
import { drawAllShapes } from "../canvasUtils/DrawShape";
import { wsURL } from "@/config";



export const useSocket = (
    token : string,
    roomId : string,
    shapesRef : React.RefObject<displayShapeType[]>,
   canvasRef: React.RefObject<HTMLCanvasElement | null> ,
   ctxRef: React.RefObject<CanvasRenderingContext2D | null>
    ) => {

  
     const ws = new WebSocket(`${wsURL}?token=${token}`);

    if(!ws)return;

    ws.onopen = () => {
        console.log("socket connected!");
        
        ws.send(JSON.stringify({
            "type" : "join_room",
            "roomId"  : roomId
        }));
        console.log(roomId);
    }

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        if (!message || typeof message !== "object" || !message.type) return;

       if (canvasRef.current && ctxRef.current) {
      drawAllShapes(canvasRef.current, shapesRef.current, ctxRef.current);
    }
      } catch (err) {
        console.warn("Invalid message received via WebSocket:", event.data);
      }
    };
    
    ws.onclose = ()=>{
        console.log("socket closed!");
    }

    return ws;

}