import { Row, Col, Stack, Form, Button, Alert } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
const Login = () => {
  const { loginUser, updateLoginInfo, loginError, isLoginLoading, loginInfo } =
    useContext(AuthContext);
  return (
    <>
      <Form onSubmit={loginUser}>
        <Row
          style={{
            height: "10vh",
            justifyContent: "center",
            paddingTop: "10%",
          }}>
          <Col xs={6}>
            <Stack gap={3}>
              <h2>Login</h2>
              <Form.Control
                type="email"
                placeholder="Enter your Email"
                onChange={(e) =>
                  updateLoginInfo({ ...loginInfo, email: e.target.value })
                }
              />
              <Form.Control
                type="password"
                placeholder="Enter your Password"
                onChange={(e) =>
                  updateLoginInfo({ ...loginInfo, password: e.target.value })
                }
              />
              <Button variant="primary" type="submit">
                {isLoginLoading ? "Getting you in .." : " Login"}
              </Button>
              {loginError?.error && (
                <>
                  <Alert variant="danger">
                    <p>{loginError?.message}</p>
                  </Alert>
                </>
              )}
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Login;
