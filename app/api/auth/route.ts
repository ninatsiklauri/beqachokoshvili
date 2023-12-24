import { NextRequest, NextResponse } from "next/server";

const users = [
  {
    id: 1,
    username: "beqachokoshvili@gmail.com",
    passwordHash: "beqa123!",
  },
];

export async function POST(request: NextRequest) {
  const body = await request.json();

  const user = users.find((user) => user.username === body.username);

  if (!user) {
    return NextResponse.json({
      success: false,
      message: "User not found",
    });
  }

  if (user.passwordHash !== body.password) {
    return NextResponse.json({
      success: false,
      message: "Invalid password",
    });
  }

  return NextResponse.json({
    success: true,
    message: "Successfully logged in",
  });
}
