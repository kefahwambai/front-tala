import React from 'react';
import { useEffect,useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { Modal } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';




export default function Album({ user }) {

  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [clientLoans, setClientLoans] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const token = sessionStorage.getItem('jwt');
  console.log(token)
  


  useEffect(() => {
    fetch('http://localhost:3000/clients', {
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
        setClients(data);
      })
      .catch((error) => console.error('API Error:', error));
  }, [token]);
  

  const handleViewLoans = (client) => {
    fetch('http://localhost:3000/loans', {
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
        const clientLoans = data.filter((loan) => loan.client.id === client.id);
        setClientLoans(clientLoans);
        setSelectedClient(client.id);
        setOpenModal(true);
      })
      .catch((error) => console.error('API Error:', error));
  };
  
  

  const handleCloseModal = () => {
    setOpenModal(false); 
  };

  function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const defaultTheme = createTheme();

  const handleLoanPaid = (loanId) => {
    
    fetch(`https://topacash.onrender.com/loans/${loanId}`, {
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
              <Button variant="contained"><Link className='text-white' style={{ textDecoration: 'none' }} to="/addClients">Create new Client</Link></Button>
              <Button variant="outlined"><Link className='text-black' style={{ textDecoration: 'none' }} to="/loans">Create new loan</Link></Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          
          <Grid container spacing={4}>
            {clients.map((client) => (
              <Grid item key={client.id} xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* <CardMedia
                    component="img"
                    src={client.avatar_url} 
                    alt={client.name}
                    height="140"
                    // image={client.avatar_url} 
                  /> */}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {client.name}
                      
                    </Typography>                   
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => handleViewLoans(client)}>View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>

      
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
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="client-loans-modal-title" variant="h6" component="h2">
            Loans taken: Ksh {calculateTotalLoanAmount()}/-
          </Typography>
          <div id="client-loans-modal-description">
            <ul>
              {clientLoans.map((loan) => (
                <li key={loan.id}>
                  Amount: Ksh {loan.amount}/- <br/>
                  Start Date: {loan.start_date} <br/>
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
    </ThemeProvider>
  );
}