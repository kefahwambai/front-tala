import React, { useEffect, useState } from 'react';
import './loansform.css';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Form, Button, Alert } from 'react-bootstrap';


function LoanForm({ user }) {
  const [amount, setAmount] = useState('');
  const [interest_rate, setInterestRate] = useState('');
  const [start_date, setStartDate] = useState('');
  const [client_id, setClientId] = useState('');
  const [message, setMessage] = useState('');
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);
  const [interest_amount, setInterestAmount] = useState('');
  const navigate = useNavigate();
  const token = sessionStorage.getItem('jwt');
//   console.log(token)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const clientsResponse = await fetch('http://localhost:3000/clients', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!clientsResponse.ok) {
            throw new Error('Network response was not ok');
          }

          const clientsData = await clientsResponse.json();
          setClients(clientsData);
        }
      } catch (error) {
        console.error('API Error:', error);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    const calculateInterest = () => {
      const calculatedInterest = (amount * interest_rate) / 100;
      setInterestAmount(calculatedInterest);
    };

    calculateInterest();
  }, [amount, interest_rate]);

  const handleSubmit = async (e) => {

    e.preventDefault();  
    const loanData = new FormData();
    loanData.append('amount', amount);
    loanData.append('interest_rate', interest_rate);
    loanData.append('interest_amount', interest_amount);
    loanData.append('start_date', start_date);
    loanData.append('client_id', client_id);
  
    try {
      const response = await fetch('http://localhost:3000/loans', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: loanData,
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      setMessage('Loan Created!');
      setTimeout(() => {
        navigate('/clientlist');
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
              required
            />
          </Form.Group>
          <Form.Group controlId="interest_rate">
            <Form.Label>Interest Rate (%):</Form.Label>
            <Form.Control
              type="number"
              value={interest_rate}
              onChange={(e) => setInterestRate(e.target.value)}
              required 
            />
          </Form.Group>
          <Form.Group controlId="interest_amount">
            <Form.Label>Interest Amount:</Form.Label>
            <Form.Control
              type="number"
              value={interest_amount}
              onChange={(e) => setInterestAmount(e.target.value)}
              required 
              readOnly
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