import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, TextField, Button, Typography, Container } from '@mui/material';
import { csrfFetch }from '../Authentication/csfr';
import * as sessionActions from '../Authentication/session.js';
import { useDispatch, useSelector } from "react-redux";
import Alert from '@mui/material/Alert'; 




function AddClientForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const dispatch = useDispatch();
  const [phonenumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phonenumber', phonenumber);
    formData.append('image', image);

    try {
      const response = await fetch('https://topacash.onrender.com/clients', {
        method: 'POST',
        body: formData,
        
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const newClient = await response.json();

      setMessage('Client Added!')
      setTimeout(() => {
        navigate('/clients'); 
      }, 1234);

      setName('');
      setEmail('');
      setPhoneNumber('');
      setImage('');

      
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Card variant="outlined" sx={{ p: 3, mt: 4 }}>
      {message && <Alert variant="success">{message}</Alert>}
        <Typography variant="h5" component="div" align="center" gutterBottom>
          Add Client
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Phonenumber"
            variant="outlined"
            value={phonenumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            margin="normal"
          />          
          <input             
            type="file"
            name="avatar"
            onChange={(e) => setImage(e.target.files[0])}
            required
            style={{ margin: '16px 0' }}
          />
          <Button variant="contained" color="primary" type="submit">
            Add Client
          </Button>
        </form>
      </Card>
    </Container>
  );
}

export default AddClientForm;
