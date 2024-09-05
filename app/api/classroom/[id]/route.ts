import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request, 
  { params }: { params: { id: string } }) {

  const classroom = await prisma.classroom.findUnique({
    where: { id: Number(params.id) },
  });

  if (!classroom) {
    return NextResponse.json({ message: 'No classroom found' }, { status: 404 });
  }

  return NextResponse.json(classroom, { status: 200 });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }) {

    const id = Number(params.id); // แปลง id เป็นตัวเลข
  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    const data = await request.json(); // รับข้อมูลจาก request body

    // ตรวจสอบว่าข้อมูลถูกต้อง
    if (!data.roomNumber || !data.floor || !data.size || !data.roomType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // อัพเดตข้อมูลห้องเรียนตาม ID
    const updatedClassroom = await prisma.classroom.update({
      where: { id },
      data: {
        roomNumber: data.roomNumber,
        floor: data.floor,
        size: data.size,
        roomImage: data.roomImage,
        roomType: data.roomType,
      },
    });

    return NextResponse.json(updatedClassroom);

  } catch (error) {
    console.error('Error updating classroom:', error);
    return NextResponse.json({ error: 'Failed to update classroom' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    return Response.json(await prisma.classroom.delete({
      where: { id: Number(params.id) },
    }))
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    })
  }
}
