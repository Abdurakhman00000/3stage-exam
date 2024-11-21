import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  
  try {
    const deletedUser = await prisma.user.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(deletedUser);
  } catch (error) {
    return NextResponse.json(error)
  }
};
