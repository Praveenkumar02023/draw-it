import { NextRequest, NextResponse } from "next/server";
import { signinValidator, signupValidator } from "@/lib/zodSchema";
import { prisma } from "@/lib/prismaClient";
import { generateToken, hashPassword, matchPassword } from "@/lib/auth";



export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = signupValidator.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid inputs :(" });
    }

    const { email, password , name } = parsed.data;

    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      return NextResponse.json({ message: "User already exist" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create( {data : {
        name : name,
        email : email,
        password : hashedPassword
    }})

    const token = await generateToken({ email: newUser.email, id: newUser.id });

    const response = NextResponse.json({
      success: true,
      message: "Signup successfull",
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 2,
    });

    return response;

  } catch (error) {
    console.log(error as Error);
    return NextResponse.json({ message: (error as Error).message });
  }
}
