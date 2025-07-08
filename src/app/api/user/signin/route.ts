import { NextRequest, NextResponse } from "next/server";
import { signinValidator } from "@/lib/zodSchema";
import { prisma } from "@/lib/prismaClient";
import { generateToken, matchPassword } from "@/lib/auth";



export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("🧾 Incoming body:", body);

    const parsed = signinValidator.safeParse(body);
    if (!parsed.success) {
      console.log("❌ Zod validation failed:", parsed.error);
      return NextResponse.json({ message: "Invalid inputs :(" }, { status: 400 });
    }

    const { email, password } = parsed.data;
    console.log("📧 Validated email:", email);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      console.log("❌ User not found");
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isPasswordCorrect = await matchPassword(password, user.password);
    if (!isPasswordCorrect) {
      console.log("❌ Incorrect password");
      return NextResponse.json({ message: "Incorrect password" }, { status: 401 });
    }

    const token = await generateToken({ email: user.email, id: user.id });
    console.log("🔐 Token generated:", token);

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 2,
    });

    return response;

  } catch (error) {
    console.error("🔥 Server error in /api/user/signin:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
