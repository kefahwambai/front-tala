import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Container,
  Box,
  Modal,
  createTheme,
} from '@mui/material';
import { Link } from 'react-router-dom';
import "./index.css";

export default function Clients({ user }) {

  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [clientLoans, setClientLoans] = useState([]);
  const [openModal, setOpenModal] = useState(false);
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

  const handleViewLoans = (client) => {
    fetch(`http://localhost:3000/loans?client_id=${client.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setClientLoans(data);
        setSelectedClient(client.id);     
        setOpenModal(true);
      })
      .catch((error) => console.error('API Error:', error));
  };
  
  
  

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const defaultTheme = createTheme();

  const handleLoanPaid = (loanId) => {
    fetch(`http://localhost:3000/loans/${loanId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const updatedClientLoans = clientLoans.filter((loan) => loan.id !== loanId);
        setClientLoans(updatedClientLoans);
      })
      .catch((error) => console.error('API Error:', error));
  };

  const calculateTotalLoanAmount = () => {
    let totalAmount = 0;
    for (const loan of clientLoans) {
      totalAmount += parseFloat(loan.amount);
    }
    return totalAmount;
  };

  return (
    <div>
      <Container sx={{ py: 15 }} maxWidth="md">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>{client.name}</TableCell>
                  <TableCell align="right">
                    <Button size="small" onClick={() => handleViewLoans(client)}>View</Button>
                    <Button size="small">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant="outlined" className='fxbtn'><Link  style={{ textDecoration: 'none' }} to="/addClients">Add Clients</Link></Button>
        <Button variant="outlined"  className='fxbtn'><Link style={{ textDecoration: 'none' }} to="/loans">Create new loan</Link></Button>        
      </Container>
      {selectedClient && (
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="client-loans-modal-title"
          aria-describedby="client-loans-modal-description"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 14,
            p: 4,
          }}>
            <Typography id="client-loans-modal-title" variant="h6" component="h2">
              Loans taken: Ksh {calculateTotalLoanAmount()}/-
            </Typography>
            <div id="client-loans-modal-description">
              <ul>
                {clientLoans.map((loan) => (
                  <li key={loan.id}>
                    Amount: Ksh {loan.amount}/- <br />
                    Start Date: {loan.start_date} <br />
                    Interest: {loan.interest_amount}/-
                    <br />
                    <Button onClick={() => handleLoanPaid(loan.id)} variant="contained" color="primary">
                      Paid
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
            <Button onClick={handleCloseModal}>Close</Button>
          </Box>
        </Modal>
      )}
    </div>
  );
}
