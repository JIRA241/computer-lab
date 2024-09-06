"use client";
import React, { useEffect, useState } from 'react';

// Define the type for classroom data
interface Classroom {
  id: number;
  roomNumber: string;
  floor: number;
  size: string;
  roomImage: string;
  roomType: string;
}

const ClassroomPage: React.FC = () => {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const response = await fetch('/api/classroom');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Classroom[] = await response.json();
        setClassrooms(data);
      } catch (error) {
        setError('Failed to fetch classrooms');
      } finally {
        setLoading(false);
      }
    };

    fetchClassrooms();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Classrooms</h1>
      <table className="min-w-full bg-while border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Room Number</th>
            <th className="py-2 px-4 border">Floor</th>
            <th className="py-2 px-4 border">Size</th>
            <th className="py-2 px-4 border">Room Type</th>
            <th className="py-2 px-4 border">Image</th>
          </tr>
        </thead>
        <tbody>
          {classrooms.map((room) => (
            <tr key={room.id}>
              <td className="py-2 px-4 border">{room.roomNumber}</td>
              <td className="py-2 px-4 border">{room.floor}</td>
              <td className="py-2 px-4 border">{room.size}</td>
              <td className="py-2 px-4 border">{room.roomType}</td>
              <td className="py-2 px-4 border">
                <img src={room.roomImage} alt={`Room ${room.roomNumber}`} width="100" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassroomPage;
