import { prisma } from "@/lib/prismaClient";
import { authMiddlware } from "@/lib/validateToken";
import { createRoomValidator } from "@/lib/zodSchema";
import { NextRequest, NextResponse } from "next/server";



export const createRoom = async(req : NextRequest) => {

    try {
        
        const decoded = await authMiddlware(req);
        
        if(!decoded || typeof decoded === "string"){
            return NextResponse.json({message : "Unauthorized"} ,{status : 400});

        }

        const body = await req.json();

        const parsed = createRoomValidator.safeParse(body);

        if(!parsed.success){

            return NextResponse.json({message : "invalid room name"} ,{status : 400});

        }

        const slug = parsed.data.slug;
        const adminId = decoded.id
        const newRoom = await prisma.room.create({
            data : {
                adminId : adminId,
                slug : slug
            }
        })

        const response = NextResponse.json({message : "room created!", roomId : newRoom.id},{status : 200});

        return response

    } catch (error) {

        console.log(error);
        return NextResponse.json({message : (error as Error).message});

    }

}