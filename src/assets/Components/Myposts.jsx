import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Myposts() {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCreatePost = () => {
    navigate("/createpost");
  };
  const handleEditPost = (postId) =>{
    navigate(`/editpost/${postId}`)
  }

  useEffect(() => {
    const fetchPost = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("https://git-backend-ig6q.onrender.com/post/myPosts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPost();
  }, []);

  const handleDeletePost = async (postId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`https://git-backend-ig6q.onrender.com/post/deletepost/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(deletePost(postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <Container>
      <div className="d-flex justify-content-center align-items-center">
        <Button className="mt-5" onClick={handleCreatePost}>
          Create Posts
        </Button>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <Container>
          {posts.map((element, index) => (
            <Card className="text-center" key={`${element._id}-${index}`}>
              <Card.Body>
                <Card.Title>{element.content}</Card.Title>
                {element.image && (
                  <Card.Img
                    variant="top"
                    src={element.image}
                    alt="Post image"
                    className="mb-3"
                  />
                )}
                <Button variant="primary" size="lg" className="me-3" onClick={()=>handleEditPost(element._id)}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="lg"
                  onClick={() => handleDeletePost(element._id)}
                >
                  Delete
                </Button>
              </Card.Body>
              <Card.Footer className="text-muted">
                <span>{new Date(element.createdAt).toLocaleDateString()}</span>
              </Card.Footer>
            </Card>
          ))}
        </Container>
      </div>
    </Container>
  );
}
