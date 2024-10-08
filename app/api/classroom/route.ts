import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
    const room = await prisma.classroom.findMany()
    return Response.json(room)
}

export async function POST(request: Request) {
   try {
       const data = await request.json();

       const room = await prisma.classroom.create({
           data: {
               roomNumber: data.roomNumber,
               floor: data.floor,
               size: data.size,
               roomImage: data.roomImage,
               roomType: data.roomType,
               courses: data.courses,
               roomBookings: data.roomBookings,
               roomRentals: data.roomRentals,
           },
       });
       return new Response(JSON.stringify(room), {
           status: 200,
           headers: { 'Content-Type': 'application/json' },
       });
   } catch (error) {
       console.error('Error creating room:', error);
       return new Response(JSON.stringify({ error: 'Failed to create room' }), {
           status: 500,
           headers: { 'Content-Type': 'application/json' },
       });
   }
}
