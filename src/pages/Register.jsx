import { Row, Col, Stack, Form, Button, Alert } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const Register = () => {
  const {
    registerInfo,
    updateRegisterInfo,
    registerUser,
    registerError,
    isRegisterLoading,
  } = useContext(AuthContext);
  //  console.log("registerError", registerError);
  return (
    <>
      <Form onSubmit={registerUser}>
        <Row
          style={{
            height: "10vh",
            justifyContent: "center",
            paddingTop: "10%",
          }}>
          <Col xs={6}>
            <Stack gap={3}>
              <h2>Register</h2>
              {/* <h2>{user.name}</h2> */}
              <Form.Control
                type="text"
                placeholder="Enter your name"
                onChange={(e) =>
                  updateRegisterInfo({ ...registerInfo, name: e.target.value })
                }
              />
              <Form.Control
                type="email"
                placeholder="Enter your Email"
                onChange={(e) =>
                  updateRegisterInfo({ ...registerInfo, email: e.target.value })
                }
              />
              <Form.Control
                type="password"
                placeholder="Enter your Password"
                onChange={(e) =>
                  updateRegisterInfo({
                    ...registerInfo,
                    password: e.target.value,
                  })
                }
              />
              <Button variant="primary " type="submit">
                {isRegisterLoading ? "Creating your account " : "Register"}
              </Button>
              {registerError?.message && (
                <Alert variant="danger">
                  <p>{registerError?.message}</p>
                </Alert>
              )}
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Register;
