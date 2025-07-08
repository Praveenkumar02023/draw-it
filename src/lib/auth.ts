import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET!

export async function hashPassword(password : string){

    return bcrypt.hash(password,10);

}

export async function matchPassword(password : string,hashedPassword:string){

    return bcrypt.compare(password,hashedPassword);

}

export async function generateToken(payload : Object){

    return jwt.sign(payload,JWT_SECRET,{expiresIn : '2d'});

}

export async function verifyToken(token : string){

    return jwt.verify(token,JWT_SECRET);

}