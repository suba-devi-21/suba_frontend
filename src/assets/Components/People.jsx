import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";

export default function People() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(
          "https://git-backend-9cej.onrender.com/user/allUsers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching user details:", error.message);
      }
    };
    fetchUsers();
  }, []);

  return (
    <Container className="d-flex flex-wrap justify-content-center">
      {users.map((element, index) => (
        <Card style={{ width: "18rem" }} key={index}>
          <Card.Body>
            <Card.Title>{element.name}</Card.Title>
            <Button variant="primary">Follow</Button>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}
