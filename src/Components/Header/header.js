import React from 'react';
import { Link } from 'react-router-dom'; 
import "./header.css"

function Header() {
  return (
    <header>
      {/* Background image */}
      <div
        className="p-5 text-center bg-image"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80')",
          height: '100vh',
        }}
      >
        <div className="mask" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">
              <h1 className="mb-3">Welcome to DebtManager</h1>
              <h5 className="mb-4">Already a member or Are you new here?</h5>
              <Link to="/login" className="btn btn-lg m-2" role="button">Login</Link>
              <Link to="/Signup" className="btn btn-lg m-2" role="button">Signup</Link>
            </div>
          </div>
        </div>
      </div>
      {/* Background image */}
    </header>
  );
}

export default Header;
