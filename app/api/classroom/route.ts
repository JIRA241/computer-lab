//test API

// export function GET(){
//     return Response.json({
//         message: 'Test'
//     })
// }

// export async function POST(request:Request){
//     const { title, content } = await request.json()
//     return Response.json({
//         data: {
//             title,
//             content
//         }
//     })
// }
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export function GET() {
    // Implement GET method here
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
