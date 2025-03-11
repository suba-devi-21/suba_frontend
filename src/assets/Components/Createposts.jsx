import axios from "axios";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addPost } from "../Redux/Reducer/postsSlice";

export default function Createposts() {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const token = localStorage.getItem("token");
      const newPost = {
        content,
        image,
      };
      const response = await axios.post(
        "https://git-backend-9cej.onrender.com/post/createpost",
        newPost,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(addPost(response.data.post));

      setContent("");
      setImage("");
    } catch (error) {
      console.log(error);

      setErrorMessage("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h2>Create Post</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicContent">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicImage">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Post"}
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}
