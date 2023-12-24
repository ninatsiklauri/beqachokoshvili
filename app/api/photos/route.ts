import { NextRequest, NextResponse } from "next/server";
import prisma from "libs/prismadb";

export async function GET() {
  const albums = await prisma.images.findMany();

  return NextResponse.json({
    success: true,
    data: albums,
    message: "Succesfully fetched all album items",
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  await prisma.images.create({
    data: {
      path: body.url,
    },
  });

  return NextResponse.json({
    success: true,
    message: "Succesfully created new album item",
  });
}

export async function DELETE(request: NextRequest) {
  const body = await request.json();

  await prisma.images.delete({
    where: {
      id: body.id,
    },
  });

  return NextResponse.json({
    success: true,
    message: "Succesfully deleted album item",
  });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();

  await prisma.images.update({
    where: {
      id: body.id,
    },
    data: {
      path: body.url,
    },
  });

  return NextResponse.json({
    success: true,
    message: "Succesfully updated album item",
  });
}
