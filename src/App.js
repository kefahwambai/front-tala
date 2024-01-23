import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoanForm from './Components/Loans/addloans';
import Signup from './Components/Authentication/Signup';
import Clientlist from './Components/Clients/clients';
import Login from './Components/Authentication/Login';
import ClientManagement from './Components/Clients';
import AddClientForm from './Components/Clients/addClients';
import Navbar from './Components/NavBar/navbar';
import Footer from './Components/Footer/footer';
import Header from './Components/Header/header';
import About from './Components/About/about';
import { useNavigate } from 'react-router-dom';
import ForgotPassword from './Components/Authentication/ForgotPassword';
import ContactUs from './Components/ContactUs/contact';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = sessionStorage.getItem('jwt');

    if (storedToken) {
      const [, payloadBase64] = storedToken.split('.');
      try {
        const decodedPayload = atob(payloadBase64);
        const parsedPayload = JSON.parse(decodedPayload);

        const expirationTime = parsedPayload.exp * 1000; 
        const currentTime = new Date().getTime();

        if (currentTime > expirationTime) {
          setUser(null);
          sessionStorage.removeItem('jwt');
          navigate('/login');
        } else {
          setUser(parsedPayload);
        }
      } catch (error) {
        console.error('Error parsing token payload:', error);
      }
    } else {
      console.log('User not found');
    }
  }, [navigate]);

  const handleSessionLogout = () => {
    setUser(null);
    sessionStorage.removeItem('jwt');
    navigate('/login');
  };

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Header />} />
        <Route path="/contactus" element={<ContactUs />} />
        {user ? (
          <>
            <Route path="/clients" element={<ClientManagement user={user} setUser={setUser} />} />
            <Route path="/loans" element={<LoanForm user={user} setUser={setUser} />} />
            <Route path="/addClients" element={<AddClientForm user={user} setUser={setUser} />} />
            <Route path="/clientlist" element={<Clientlist user={user} setUser={setUser} />} />
          </>
        ) : (
          <>
            <Route path="/signup" element={<Signup setUser={setUser} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            {/* <Route path="/forgotpassword" element={<ForgotPassword/>} /> */}
          </>
        )}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
