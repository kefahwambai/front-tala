import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import "./footer.css"

export default function Footer() {
  return (
    <div >
      <footer className="text-center text-lg-start text-black footerr">
        <Container>
          <Row>
            <Col md={3} lg={3} xl={3} className="mx-auto mt-5">
              <h6 className="text-uppercase mb-4 font-weight-bold">Debt Manager</h6>
              <p>
                Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
            </Col>
            <Col md={3} lg={2} xl={2} className="mx-auto mt-5">
              <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <Link to="/about" className="text-reset">About</Link>
              </p>
              <p>
                <Link to="/contactus" className="text-reset">Contact Us</Link>
              </p>
            </Col>

            <Col md={4} lg={3} xl={3} className="mx-auto mt-5">
              <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
              <p><i className="fas fa-home mr-3"></i> Kitui, Ndolo Corner, Kenya</p>
              <p><i className="fas fa-envelope mr-3"></i> debtmanager@support.com</p>
              <p><i className="fas fa-phone mr-3"></i> + 01 234 567 88</p>
              <p><i className="fas fa-print mr-3"></i> + 01 234 567 89</p>
            </Col>
          </Row>
        </Container>
        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          © 2023 Copyright: <a className="text-white" href="#">debtmanager.com</a>
        </div>
      </footer>
    </div>
  );
}
