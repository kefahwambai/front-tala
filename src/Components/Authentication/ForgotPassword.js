import React, { useState } from 'react';
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "./session";



function ForgotPassword() { 
  
  const [email, setEmail] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("")
 

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      await dispatch(sessionActions.ForgotPassword({ email  }));
      setMessage("Check your Email for further Instructions.")
      setTimeout(() => {
        navigate('/login'); 
      }, 1234);      
      
    } catch (error) {
      if (error instanceof Error) {
        const data = await error.json();
        if (data && data.errors) {
          setLoginError(data.errors);
        }
      }
    }
  };

 

  return (
    <div>
      <Card>
        <Card.Body className='mx-auto'>
          <h2 className='text-center mb-4'>Password Reset</h2>
          <Form type="sumit" onSubmit={handleSubmit}>
             {loginError && <Alert variant="danger" className="SignupError">{loginError}</Alert>}
             {message && <Alert variant="success">{message}</Alert>}
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control className='w-80' type="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>  
            <br/>         
            <Button className='w-80' type="submit" onSubmit={handleSubmit}>Reset Password</Button>                      
          </Form>
          <div className='w-100 text-center mt-3'>
            <Link to="/login">Login</Link>
          </div>
          <div className='w-100 text-center mt-2'>
            Don't have an account? <Link to="/signup">Signup</Link>
          </div>
        </Card.Body>
      </Card>
     
    </div>
  )
}

export default ForgotPassword;