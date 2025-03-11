import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { editPost } from "../Redux/Reducer/postsSlice"; // Import the editPost action
import { useParams } from "react-router-dom"; // To get the post ID from the URL

export default function EditPost() {
  const { id } = useParams(); 
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`https://git-backend-9cej.onrender.com/post/get/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.post.content);
        setContent(response.data.post.content||"");
        setImage(response.data.post.image||"");
      } catch (error) {
        console.error("Error fetching post data:", error);
        setErrorMessage("Failed to load post data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const token = localStorage.getItem("token");
      const updatedPost = {
        content,
        image,
      };
      
      const response = await axios.patch(
        `https://git-backend-9cej.onrender.com/post/editpost/${id}`,
        updatedPost,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    //   console.log(response.data)
      if (response.data.updatedPost) {
        dispatch(editPost(response.data.updatedPost));
        setErrorMessage("Post updated successfully!");
      } else {
        setErrorMessage("Failed to update post.");
      }

      setErrorMessage("Post updated successfully!");
    } catch (error) {
      console.error("Error updating post:", error);
      setErrorMessage("Failed to update post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h2>Edit Post</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
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
        </Form.Group>

        <div className="mt-3">
        <Button variant="primary" type="submit" disabled={loading} className="me-3">
          {loading ? "Updating..." : "Update Post"}
        </Button>
        <Button variant="secondary"  onClick={() => navigate("/posts")}>
          Cancel
        </Button>
        </div>
      </Form>
    </Container>
  );
}
