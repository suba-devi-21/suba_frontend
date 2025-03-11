import axios from "axios";
import { Formik } from "formik";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useState } from "react"; // Import useState

export default function Signin() {
  const navigate = useNavigate(); // Create a navigate function
  const [alertMessage, setAlertMessage] = useState(""); // State for alert message

  return (
    <>
      <Container
        fluid
        className="d-flex justify-content-center align-items-center vh-100"
      >
        <Row className="w-100">
          <Col xs={12} md={6} lg={4} className="mx-auto">
            <div className="loginform p-4 border rounded bg-light">
              <h2 className="text-center">Register</h2>
              {alertMessage && <div className="alert alert-danger">{alertMessage}</div>} {/* Display alert message */}
              <Formik
                initialValues={{
                  name: "",
                  dob: "",
                  email: "",
                  password: "",
                  confirmpassword: "",
                }}
                validate={(values) => {
                  const errors = {};
                  const today = new Date();
                  const birthDate = new Date(values.dob);
                  const age = today.getFullYear() - birthDate.getFullYear();
                  const monthDifference = today.getMonth() - birthDate.getMonth();

                  if (!values.name) {
                    errors.name = "Required!";
                  } else if (values.name.length < 3) {
                    errors.name = "User name should be at least 3 characters";
                  }
                  if (!values.dob) {
                    errors.dob = "Required!";
                  } else if (age < 18 || (age === 18 && monthDifference < 0)) {
                    errors.dob = "You must be at least 18 years old";
                  }
                  if (!values.email) {
                    errors.email = "Required!";
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.email
                    )
                  ) {
                    errors.email = "Invalid email address";
                  }
                  if (!values.password) {
                    errors.password = "Required";
                  }
                  if (!values.confirmpassword) {
                    errors.confirmpassword = "Required";
                  }
                  if (values.password !== values.confirmpassword) {
                    errors.confirmpassword = "Passwords do not match";
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(true);
                  axios
                    .post("https://git-backend-9cej.onrender.com/user/register", values)
                    withCredentials: true
                    .then((res) => {
                      const result = res.data;
                      if (result.message === "User Registered Successfully") {
                        navigate("/login");
                      } else {
                        setAlertMessage(result.message);
                      }
                    })
                    .catch((error) => {
                      if (
                        error.response &&
                        error.response.data &&
                        error.response.data.message
                      ) {
                        setAlertMessage(error.response.data.message);
                      } else {
                        setAlertMessage("An error occurred. Please try again.");
                      }
                    })
                    .finally(() => {
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
                    <Form.Group className="mb-3" controlId="name">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        isInvalid={touched.name && !!errors.name}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="dob">
                      <Form.Label>Date of Birth</Form.Label>
                      <Form.Control
                        type="date"
                        name="dob"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.dob}
                        isInvalid={touched.dob && !!errors.dob}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.dob}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email" // Make sure the name matches your initialValues
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
                        name="password" // Add name attribute
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

                    <Form.Group
                      className="mb-3"
                      controlId="formBasicConfirmPassword"
                    >
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmpassword" // Add name attribute
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirmpassword}
                        isInvalid={touched.confirmpassword && !!errors.confirmpassword}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.confirmpassword}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100" disabled={isSubmitting}>
                      Register
                    </Button>
                  </Form>
                )}
              </Formik>
              <br />
              <div className="d-flex justify-content-center align-items-center">
                <Link to="/login">
                  Already have an account? Click here to login
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
