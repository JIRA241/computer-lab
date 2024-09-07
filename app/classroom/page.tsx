"use client";
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Card, TextField, MenuItem, Select, InputLabel, FormControl, Grid } from '@mui/material';
import CardContent from '@mui/material/CardContent';

// ประกาศ type 
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

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterType, setFilterType] = useState<string>(''); // ฟิลเตอร์ roomType
  const [sortField, setSortField] = useState<string>('');   // สนามจัดเรียง

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

  // ฟังก์ชันจัดการการค้นหา
  const handleSearch = () => {
    return classrooms.filter((classroom) =>
      classroom.roomNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // ฟังก์ชันจัดการการกรอง
  const handleFilter = (filteredClassrooms: Classroom[]) => {
    if (!filterType) return filteredClassrooms;
    return filteredClassrooms.filter((classroom) => classroom.roomType === filterType);
  };

  // ฟังก์ชันจัดการการจัดเรียง
  const handleSort = (filteredClassrooms: Classroom[]) => {
    if (!sortField) return filteredClassrooms;
    return [...filteredClassrooms].sort((a, b) =>
      a[sortField as keyof Classroom] > b[sortField as keyof Classroom] ? 1 : -1
    );
  };

  const processedClassrooms = handleSort(handleFilter(handleSearch()));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Card className="container mx-auto p-4">
      <CardContent>
        <h1 className="text-2xl text-black mb-4">Classrooms</h1>

        {/* ใช้ Grid เพื่อให้ search, filter, sort อยู่ในแถวเดียวกัน */}
        <Grid container spacing={2} alignItems="center" marginBottom={3}>
          {/* Search input */}
          <Grid item xs={12} sm={4}>
            <TextField
              label="Search by Room Number"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
            />
          </Grid>

          {/* Filter select */}
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Filter by Room Type</InputLabel>
              <Select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="lecture">lecture</MenuItem>
                <MenuItem value="lab">Lab</MenuItem>
                <MenuItem value="seminar">seminar</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Sort select */}
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Sort by</InputLabel>
              <Select
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="roomNumber">Room Number</MenuItem>
                <MenuItem value="floor">Floor</MenuItem>
                <MenuItem value="size">Size</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Room Number</TableCell>
                <TableCell align="right">Floor</TableCell>
                <TableCell align="right">Size</TableCell>
                <TableCell align="right">Room Type</TableCell>
                <TableCell align="right">Image</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {processedClassrooms.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.roomNumber}
                  </TableCell>
                  <TableCell align="right">{row.floor}</TableCell>
                  <TableCell align="right">{row.size}</TableCell>
                  <TableCell align="right">{row.roomType}</TableCell>
                  <TableCell align="right">
                    <img
                      src={row.roomImage}
                      alt={`Room ${row.roomNumber}`}
                      width="100"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default ClassroomPage;
