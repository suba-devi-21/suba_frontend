import axios from "axios";
import { Formik } from "formik";
import { useContext, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../ContextAPI/AuthContext";

export default function Login() {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [forceUpdate, setForceUpdate] = useState(0); 

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center vh-100"
    >
      <Row className="w-100">
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <div className="loginform p-4 border rounded bg-light">
            <h2 className="text-center">Login</h2>
            {alertMessage && (
              <div className="alert alert-danger">{alertMessage}</div>
            )}
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = "Required!";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }
                if (!values.password) {
                  errors.password = "Required";
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                axios
                  .post("https://git-backend-9cej.onrender.com/user/login", values)
                  .then((res) => {
                    const result = res.data;
                    console.log(result);
                    if (result.message === "Login Successful") {
                      setIsAuthenticated(true);
                      localStorage.setItem('token', result.token);
                      localStorage.setItem('user', JSON.stringify(result.user));
                      localStorage.setItem('userId',result.userId);
                      console.log(result.token, result.user);
                      setSubmitting(false);
                      navigate('/dashboard');
                      setForceUpdate(prev => prev + 1);
                    } else {
                      setAlertMessage(result.message);
                      setSubmitting(false);
                    }
                    
                  })
                  .catch((error) => {
                    setAlertMessage("An error occurred. Please try again.");
                    console.error(error); 
                    setSubmitting(false);
                  });
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      isInvalid={touched.email && !!errors.email}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      isInvalid={touched.password && !!errors.password}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Logging in...' : 'Login'}
                  </Button>
                </Form>
              )}
            </Formik>
            <br />
            <div className="d-flex justify-content-center align-items-center">
              <Link to="/signin">
                Don't you have an account? Click here to sign in
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
