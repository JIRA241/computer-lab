import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
    const course = await prisma.course.findMany()
    return Response.json(course)
}

export async function POST(request: Request) {
   try {
       const data = await request.json();

       const course = await prisma.course.create({
           data: {
            courseCode: data.courseCode,
            courseName: data.courseName,
            teacher: data.teacher,
            classroomId: data.classroomId,
           },
       });
       return new Response(JSON.stringify(course), {
           status: 200,
           headers: { 'Content-Type': 'application/json' },
       });
   } catch (error) {
       console.error('Error creating room:', error);
       return new Response(JSON.stringify({ error: 'Failed to create course' }), {
           status: 500,
           headers: { 'Content-Type': 'application/json' },
       });
   }
}
