import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const DELETE = async (req: Request) => {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const data = await prisma.user.delete({
      where: {
        id: parseInt(id, 10),
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error deleting todo:", error);

    return NextResponse.json(
      { error: "Failed to delete the todo" },
      { status: 500 }
    );
  }
};