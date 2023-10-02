import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert'; 
import * as sessionActions from '../Authentication/session.js';
import { useDispatch, useSelector } from 'react-redux';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState('');
  const sessionUser = useSelector((state) => state.session.user);
  const [message, setMessage] = useState('');

  const handleLogout = async (event) => {
    event.preventDefault();

    try {
      await dispatch(sessionActions.logout(sessionUser.id));
      setMessage("Logout Successful")
      setTimeout(() => {
        navigate('/login'); 
      }, 2345);      
    } catch (error) {
      if (error instanceof Error) {
        const data = await error.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      }
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
            <li className="nav-item active">
              <Link to="/" className="nav-link text-black" style={{ textDecoration: 'none' }}>
                Home
              </Link>
            </li>
            {message && <Alert variant="success">{message}</Alert>}
            <li className="nav-item active">
              {sessionUser && (
                <Link
                  to="/clients"
                  className="nav-link text-black"
                  style={{ textDecoration: 'none' }}
                >
                  Dashboard
                </Link>
              )}
            </li>
          </ul>
          {sessionUser && (
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
