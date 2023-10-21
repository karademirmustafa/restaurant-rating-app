import {  Navbar, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/AuthService';

function Header() {

  const navigate = useNavigate();


  const handleLogout = async () => {
    await authService.logout();
    navigate("/")
  };

  return (
    <Navbar className="bg-body-tertiary" bg="light">
      <Container>
        <Navbar.Brand>
          <Link to="/" className='text-primary'>Restaurant Rating App</Link></Navbar.Brand>
        <Navbar.Toggle />

        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="mx-4 text-primary text-reset">
            <Link to="/info" className="text-info">Info </Link>
          </Navbar.Text>
          <Navbar.Text>

            {authService.getJwtCookie() ? <button onClick={handleLogout}>Logout</button> : <div>

              <button className="mx-2" onClick={() => navigate('/register')}>Register</button>
              <button onClick={() => navigate('/login')}>Login</button>
            </div>}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
