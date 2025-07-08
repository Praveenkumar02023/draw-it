import { prisma } from "@/lib/prismaClient";
import { authMiddlware } from "@/lib/validateToken";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req : NextRequest ){

    try {
        const decoded = await  authMiddlware(req);

        if(!decoded){
            return NextResponse.json({message : "unauthorized"},{status : 400});
        }

        const { searchParams } = new URL(req.url)
        const roomId = searchParams.get("id");

        if(!roomId){
            return NextResponse.json({message : "roomId not found"},{status : 400});
        }

        const room = await prisma.room.findUnique({where : {id : Number(roomId)}})
        
        if(!room){
            return NextResponse.json({message : "room not found"},{status : 400});
        }

        const messages = await prisma.chat.findMany({where : {roomId : Number(roomId)}});

        return NextResponse.json({message : "message fetched!",messages});

    } catch (error) {
        console.log(error);
       return NextResponse.json({message : (error as Error).message});
    }

}