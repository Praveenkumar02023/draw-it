import { WebSocket, WebSocketServer } from "ws";
import { parse } from "cookie";
import jwt from "jsonwebtoken";
import { prisma } from "../src/lib/prismaClient";

const JWT_SECRET = process.env.JWT_SECRET!;

interface User {
  ws: WebSocket;
  roomId: string[];
  userId: string;
}

const users = new Map<string, User>();

function decodeToken(token: string): string {
 try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    return decoded.id;
 } catch (error) {
    console.log(error);
    return '';
 }
}

const wsServer = new WebSocketServer({ port: 8005 });

wsServer.on("connection", (ws, req) => {
  
  const cookieHeader = req.headers.cookie || "";
  const cookies = parse(cookieHeader);

  const token = cookies.token

  if (!token) return ws.close();

  let userId: string;
  try {
    userId = decodeToken(token);
    if(!userId){
        return ws.close();
    }
  } catch (err) {
    return ws.close();
  }

  users.set(userId, { ws, userId, roomId: [] });

  ws.on("message", async (data) => {
    try {
      const parsed = JSON.parse(data.toString());

      const user = users.get(userId);
      if (!user) return;

      if (parsed.type === "join_room") {
        const roomId = String(parsed.roomId);
        if (!user.roomId.includes(roomId)) user.roomId.push(roomId);
      }

      if (parsed.type === "leave_room") {
        user.roomId = user.roomId.filter((id) => id !== parsed.roomId);
      }

      if (parsed.type === "chat") {
        const roomId = parsed.roomId;

        await prisma.chat.create({
          data: {
            message: parsed.message,
            userId,
            roomId: Number(roomId),
          },
        });

        // Broadcast to users in same room
        for (const u of users.values()) {
          if (u.roomId.includes(String(roomId))) {
            u.ws.send(JSON.stringify(parsed));
          }
        }
      }
    } catch (err) {
      console.warn("Failed to handle WS message:", err);
    }
  });

  ws.on("close", () => {
    users.delete(userId);
  });

  ws.on("error", console.error);
});


