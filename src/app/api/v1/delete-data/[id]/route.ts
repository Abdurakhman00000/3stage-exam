import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface IDeleteParams {
  params: {
    id: string;
  };
}

export const DELETE = async (req: Request, { params }: IDeleteParams) => {
  const { id } = params;

  const data = await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });
  return NextResponse.json(data);
};