-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('student', 'teacher', 'admin');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'other');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('small', 'medium', 'large');

-- CreateEnum
CREATE TYPE "RoomType" AS ENUM ('lecture', 'lab', 'seminar');

-- CreateEnum
CREATE TYPE "ClassDay" AS ENUM ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "userType" "UserType" NOT NULL,
    "studentId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "profileImage" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "gender" "Gender",
    "passwordHash" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Classroom" (
    "id" SERIAL NOT NULL,
    "roomNumber" TEXT NOT NULL,
    "floor" INTEGER NOT NULL,
    "size" "Size" NOT NULL,
    "roomImage" TEXT,
    "roomType" "RoomType" NOT NULL,

    CONSTRAINT "Classroom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "courseCode" TEXT NOT NULL,
    "courseName" TEXT NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "classroomId" INTEGER NOT NULL,
    "classDay" "ClassDay" NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomBooking" (
    "id" SERIAL NOT NULL,
    "classroomId" INTEGER NOT NULL,
    "bookingDate" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "approverId" INTEGER NOT NULL,

    CONSTRAINT "RoomBooking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomRental" (
    "id" SERIAL NOT NULL,
    "classroomId" INTEGER NOT NULL,
    "rentalDate" TIMESTAMP(3) NOT NULL,
    "rentalStartTime" TIMESTAMP(3) NOT NULL,
    "renterId" INTEGER NOT NULL,
    "rentalDetails" TEXT,
    "returnDate" TIMESTAMP(3) NOT NULL,
    "returnTime" TIMESTAMP(3) NOT NULL,
    "returnerId" INTEGER NOT NULL,

    CONSTRAINT "RoomRental_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_studentId_key" ON "User"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Classroom_roomNumber_key" ON "Classroom"("roomNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Course_courseCode_key" ON "Course"("courseCode");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomBooking" ADD CONSTRAINT "RoomBooking_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomBooking" ADD CONSTRAINT "RoomBooking_approverId_fkey" FOREIGN KEY ("approverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomRental" ADD CONSTRAINT "RoomRental_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomRental" ADD CONSTRAINT "RoomRental_renterId_fkey" FOREIGN KEY ("renterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomRental" ADD CONSTRAINT "RoomRental_returnerId_fkey" FOREIGN KEY ("returnerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
