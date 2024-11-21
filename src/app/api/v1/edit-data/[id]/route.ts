import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
  const { id } = params;  

  if (!id) {
    return NextResponse.json({ message: "Id" }, { status: 400 });
  }

  try {
    const data = await request.json();
    
    if (!data.firstName || !data.lastName) {
      return NextResponse.json({ message: "success" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },  
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
      },
    });

    return NextResponse.json({ message: "successfully", updatedUser }, { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
};
