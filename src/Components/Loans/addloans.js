import React, { useEffect, useState } from 'react';
import './loansform.css';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Form, Button, Alert } from 'react-bootstrap';


function LoanForm() {
  const [amount, setAmount] = useState('');
  const [interest_rate, setInterestRate] = useState('');
  const [start_date, setStartDate] = useState('');
  const [client_id, setClientId] = useState('');
  const [message, setMessage] = useState('');
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);
  const [interest_amount, setInterestAmount] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/clients')
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Network response was not ok');
        }
        return resp.json();
      })
      .then((data) => {
        // console.log('Client data:', data);
        setClients(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create a FormData object
    const loanData = new FormData();
    loanData.append('amount', amount);
    loanData.append('interest_rate', interest_rate);
    loanData.append('interest_amount', interest_amount);
    loanData.append('start_date', start_date);
    loanData.append('client_id', client_id);
  
    try {
      const response = await fetch('http://localhost:3000/loans', {
        method: 'POST',
        body: loanData,
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      setMessage('Loan Created!');
      setTimeout(() => {
        navigate('/clients');
      }, 1234);
  
      setAmount('');
      setInterestRate('');
      setInterestAmount('');
      setStartDate('');
      setClientId('');
      setError(null);
    } catch (error) {
      console.error('API Error:', error);
      setError(error.message);
    }
  };
  

  return (
    <Card className='cardform'>
      <Card.Body className="loanform">
      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}
        <Card.Title>Create Loan</Card.Title>
        {message}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="amount">
            <Form.Label>Loan Amount:</Form.Label>
            <Form.Control
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required // Add validation here
            />
          </Form.Group>
          <Form.Group controlId="interest_rate">
            <Form.Label>Interest Rate:</Form.Label>
            <Form.Control
              type="number"
              value={interest_rate}
              onChange={(e) => setInterestRate(e.target.value)}
              required // Add validation here
            />
          </Form.Group>
          <Form.Group controlId="interest_amount">
            <Form.Label>Interest Amount:</Form.Label>
            <Form.Control
              type="number"
              value={interest_amount}
              onChange={(e) => setInterestAmount(e.target.value)}
              required // Add validation here
            />
          </Form.Group>
          <Form.Group controlId="start_date">
          <br/>
            <Form.Label>Start Date:</Form.Label>
            <Form.Control
              type="date"
              value={start_date}
              onChange={(e) => setStartDate(e.target.value)}
              required // Add validation here
            />
          </Form.Group>
          <Form.Group controlId="client_id">
            <Form.Label>Client:</Form.Label>
            <Form.Control
              as="select"
              value={client_id}
              onChange={(e) => {
                // console.log('Selected client ID:', e.target.value);
                setClientId(parseInt(e.target.value, 10));

              }}
              required
            >
              <option value="">Select a client</option>
              {clients.map((data) => (
                <option key={data.id} value={data.id}>
                  {data.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <br/>          
          <Button variant="primary" type="submit">
            Create Loan
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default LoanForm;