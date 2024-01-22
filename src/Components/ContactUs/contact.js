import React, { useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, TextField, Button, Box } from '@mui/material';
import './ContactUs.css';
import Alert from '@mui/material/Alert'; 
import { useNavigate } from 'react-router-dom';

function ContactUs() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [display, setDisplay] = useState('')
    const navigate = useNavigate();
    const [errors, setErrors] = useState('')  


    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const feedbackData = new FormData();
      feedbackData.append('name', name);
      feedbackData.append('email', email);
      feedbackData.append('message', message);
      
      try {
        const response = await fetch('https://topacash.onrender.com/feedbacks', {
          method: 'POST',
          body: feedbackData,
          
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }  
        setMessage('Thank you, Your feedback has been received!')
        setTimeout(() => {
          navigate('/clients'); 
        }, 1234);
  
        setName('');
        setEmail('');
        setMessage('');    
      } catch (error) {
        console.error('API Error:', error);
      }
    };


  return (
    <Container className="contact-us">
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" paragraph>
        If you have any questions or concerns, our friendly and knowledgeable staff is available to assist you. You can reach us by phone, email, or through our website. <br/> You can leave us a feedback below to help us improve our services
      </Typography>
      {display && <Alert variant="success">{display}</Alert>}
      <Typography variant="h6" marginTop={2}>
        Send us your feedback
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="normal"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Message"
          name="message"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default ContactUs;