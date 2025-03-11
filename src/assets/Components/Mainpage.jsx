import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { commentPost, likePost } from "../Redux/Reducer/postsSlice";
import { Col, Container, Row } from "react-bootstrap";

export default function Mainpage() {
  const [allPost, setAllPost] = useState([]);
  const [commentText, setCommentText] = useState(""); 
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user?.userId);

  useEffect(() => {
    const fetchAllPost = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "https://git-backend-9cej.onrender.com/post/allPosts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAllPost(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchAllPost();
  }, []);

  const handleLikePost = async (postId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.patch(
        `https://git-backend-9cej.onrender.com/post/like/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAllPost((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, likes: [...post.likes, userId] }
            : post
        )
      );

      dispatch(likePost({ postId, userId }));
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  const handleCommentSubmit = async (e, postId) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    
    const comment = { userId, text: commentText };

    
    dispatch(commentPost({ postId, comment }));

    try {
      
      await axios.patch(`https://git-backend-9cej.onrender.com/post/comment/${postId}`, comment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCommentText("");
      
      
      const response = await axios.get(
        "https://git-backend-9cej.onrender.com/post/allPosts",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setAllPost(response.data.data); 
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <>
      {allPost.map((element, index) => (
        <Card
          className="text-center"
          key={`${index}-${element._id}-${element.content}`}
        >
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
            <div>
              {element.comments.map((comment, idx) => (
                <div key={idx}>
                  <strong>{comment.userId.name}:</strong> {comment.text}
                </div>
              ))}
            </div>
          </Card.Body>
          <Card.Footer className="text-muted">
            <Container>
              <Row>
                <Col>
                  <Card.Img
                    variant="top"
                    src="./like.png"
                    alt="likes"
                    className="likeimg me-5"
                    onClick={() => handleLikePost(element._id)}
                    disabled={element.likes.includes(userId)}
                  />
                </Col>
                <Col>
                  <form onSubmit={(e) => handleCommentSubmit(e, element._id)}>
                    <input
                      type="text"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Add a comment..."
                      required
                    />
                    <Button variant="primary" type="submit">Submit</Button>
                  </form>
                </Col>
                <Col>
                  <span>Created By: {element.userId.name}</span>
                </Col>
                <Col>
                  <span>
                    Created on:{" "}
                    {new Date(element.createdAt).toLocaleDateString()}
                  </span>
                </Col>
              </Row>
            </Container>
          </Card.Footer>
        </Card>
      ))}
    </>
  );
}
