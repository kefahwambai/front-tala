import React from "react";
import { Routes, Route } from "react-router-dom";
import LoanForm from "./Components/Loans/addloans";
import Signup from "./Components/Authentication/Signup";
import Login from "./Components/Authentication/Login";
import ClientManagement from "./Components/Clients";
import AddClientForm from "./Components/Clients/addClients";
import Navbar from "./Components/NavBar/navbar";
import Footer from "./Components/Footer/footer";
import Header from "./Components/Header/header";
import About from "./Components/About/about";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ForgotPassword from "./Components/Authentication/ForgotPassword";
import ContactUs from "./Components/ContactUs/contact";

function App() {
  const sessionUser = useSelector((state) => state.session.user);
  
 

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Header />} />
        <Route path="/contactus" element={<ContactUs/>} />
        {sessionUser ? (
          <>
            <Route path="/clients" element={<ClientManagement />} />
            <Route path="/loans" element={<LoanForm />} />
            <Route path="/addClients" element={<AddClientForm />} />
          </>
        ) : (
          <>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpassword" element={<ForgotPassword/>} />
          </>
        )}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
