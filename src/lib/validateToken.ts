import { log } from "console";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./auth";



export const authMiddlware = async(req : NextRequest)=>{
   
    try {
        
        const token = req.cookies.get('token')?.value;

        if(!token){
             log({message : "token not found please login"});
             return;
        } 

        const decoded = await verifyToken(token);
        if(!decoded){
            log({message : "token not valid"});
            return null
        }

        return decoded

    } catch (error) {
        log(error)
        return null;
    }

}