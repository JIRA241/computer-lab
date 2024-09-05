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
  // Add other fields as needed
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
    <div>
      <h1>Classrooms</h1>
      <ul>
        {classrooms.map((room) => (
          <li key={room.id}>
            <h2>Room {room.roomNumber}</h2>
            <p>Floor: {room.floor}</p>
            <p>Size: {room.size}</p>
            <img src={room.roomImage} alt={`Room ${room.roomNumber}`} width="200" />
            <p>Type: {room.roomType}</p>
            {/* Display other fields as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassroomPage;
