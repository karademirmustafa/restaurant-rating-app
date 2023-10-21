import React, { useState } from 'react';
import { Button, Navbar, Container } from 'react-bootstrap';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Giriş işlemi burada yapılabilir.
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Çıkış işlemi burada yapılabilir.
    setIsLoggedIn(false);
  };

  return (
    <Navbar className="bg-body-tertiary" bg="light">
    <Container>
      <Navbar.Brand href="#home">Restaurant Rating App</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Signed in as: <a href="#login">Mark Otto</a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default Header;
