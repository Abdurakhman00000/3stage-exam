import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient();



export const POST = async (request: Request) => {
    const body = await request.json();
    const { firstName, lastName, email, password, image } = body;
    try {
        const newData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            image: image,
        }
        const data = await prisma.user.create({
            data: newData
        })
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(error)
    }
}