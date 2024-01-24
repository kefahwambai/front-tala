import React from 'react';
import { useEffect,useState } from 'react';
import {
  CssBaseline,
  Button,
  Typography,
  Container,
  Box,
  Stack,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { Link } from 'react-router-dom';



export default function Album({ user }) {


  const defaultTheme = createTheme();


  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />     
      <main>        
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Welcome to your Dashboard 
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Discover our Shylocks and Finance Management tools designed to empower your financial journey. Explore the wide range of features and services offered, created to simplify your financial management tasks and help you achieve your financial goals.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained"><Link className='text-white' style={{ textDecoration: 'none' }} to="/clientlist">View Your Active Clients</Link></Button>
              
            </Stack>
          </Container>
        </Box>
       
      </main>

  
    </ThemeProvider>
  );
}