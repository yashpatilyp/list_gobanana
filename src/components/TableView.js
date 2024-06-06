import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

export default function TableView() {
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch data from the API on component mount
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setRows(response.data);  // Set the fetched data to rows state
        setLoading(false);  // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);  // Set loading to false in case of error
      });
  }, []);

  // Handle changes in the search input
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter rows based on the search term
  const filteredRows = rows.filter((row) => 
    row.id.toString().includes(searchTerm) ||
    row.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '70%', margin: 'auto', marginTop: 100, position: 'relative' }}>
      {/* Search input box */}
      <Box sx={{ top: 100, zIndex: 1000, backgroundColor: 'white' }}>
        <TextField
          label="Search ID / TITLE / BODY"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Box>
      {/* Table container with scrollable content */}
      <TableContainer component={Paper} sx={{ marginTop: 5, maxHeight: 600, overflow: 'auto' }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead sx={{ position: 'sticky', top: 0, zIndex: 900, backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Body</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              // Show skeletons while loading
              Array.from(new Array(20)).map((_, index) => (
                <TableRow key={index}>
                  <TableCell align="center">
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell align="left">
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell align="left">
                    <Skeleton animation="wave" />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              // Show filtered rows after loading
              filteredRows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
                    '&:nth-of-type(even)': { backgroundColor: '#ffffff' },
                    '&:hover': { backgroundColor: '#f1f1f1' },
                  }}
                >
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="left">{row.title}</TableCell>
                  <TableCell align="left">{row.body}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
