import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const PATCH = async (request: Request) => {
  try {
    const url = new URL(request.url, `http://${request.headers.get("host")}`);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json({ message: "ID" }, { status: 400 });
    }

    const data = await request.json();

    if (!data.firstName || !data.lastName) {
      return NextResponse.json(
        { message: "400" },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) }, 
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
      },
    });

    return NextResponse.json(
      { message: "Success", updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed m" },
      { status: 500 }
    );
  }
};
