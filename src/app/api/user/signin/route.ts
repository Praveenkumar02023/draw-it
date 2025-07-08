import { NextRequest, NextResponse } from "next/server";
import { signinValidator } from "@/lib/zodSchema";
import { prisma } from "@/lib/prismaClient";
import { generateToken, matchPassword } from "@/lib/auth";



export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = signinValidator.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid inputs :(" },{status : 400});
    }

    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ message: "User not found" },{status : 400});
    }

    const isPasswordCorrect = await matchPassword(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json({ message: "incorrect password" },{status : 400});
    }

    const token = await generateToken({ email: user.email, id: user.id });

    const response = NextResponse.json({
      success: true,
      message: "login successfull",
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
