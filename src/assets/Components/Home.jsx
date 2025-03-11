import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const navLogin = () => {
    navigate("/login");
  };
  const navSignin = () => {
    navigate("/signin");
  };
  return (
    <>
      <Container
        fluid
        className="d-flex justify-content-center align-items-center vh-100"
      >
        <div>
          <h1>Welcome to the Social Media App</h1>
          <br />
          <br />
          <div className="d-flex justify-content-center align-items-center">
            <Button
              variant="success"
              className="me-3"
              size="lg"
              onClick={navLogin}
            >
              Login
            </Button>
            <Button variant="success" size="lg" onClick={navSignin}>
              Sign In
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
