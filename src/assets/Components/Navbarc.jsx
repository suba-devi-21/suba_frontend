import { useContext, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../ContextAPI/AuthContext';

export default function Navbarc() {
  const {logout, isAuthenticated} =useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () =>{
    logout();
    navigate('/login');
  }


if (!isAuthenticated) return null;

  if(!isAuthenticated) return 
  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Navbar.Brand>
        My App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/dashboard">
            Dashboard
          </Nav.Link>
          <Nav.Link as={Link} to="/people">
            Add Friend
          </Nav.Link>
          <Nav.Link as={Link} to="/myposts">
            Your Posts
          </Nav.Link>
          <Nav.Link onClick={handleLogout}>
            Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
