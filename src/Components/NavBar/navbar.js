import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert'; 

function Navbar({ setUser, user }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState('');
  const [message, setMessage] = useState('');

  
  const handleLogout = async () => {
    try {
      const token = sessionStorage.getItem("jwt");
      if (!token) {
        console.error("No JWT token found in local storage.");
        return;
      }
      sessionStorage.removeItem("jwt");
      setUser(null);   
      navigate("/");
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarExample01">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          
            {message && <Alert variant="success">{message}</Alert>}
            <li className="nav-item active">
            {user ? (
                <Link to="/clients" className="nav-link text-black" style={{ textDecoration: 'none' }}>
                  Dashboard
                </Link>
              ) : (
                
                  <Link to="/" className="nav-link text-black" style={{ textDecoration: 'none' }}>
                    Home
                  </Link>
                
              )}

            </li>
          </ul>
          {user && (
            <Button variant="contained" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;