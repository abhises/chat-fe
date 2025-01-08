import { Row, Col, Stack, Form, Button, Alert } from "react-bootstrap";

const Login = () => {
  return (
    <>
      <Form>
        <Row
          style={{
            height: "10vh",
            justifyContent: "center",
            paddingTop: "10%",
          }}>
          <Col xs={6}>
            <Stack gap={3}>
              <h2>Login</h2>
              <Form.Control type="email" placeholder="Enter your Email" />
              <Form.Control type="password" placeholder="Enter your Password" />
              <Button variant="primary " type="submit">
                Login
              </Button>
              <Alert variant="danger">
                <p>Error occured</p>
              </Alert>
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Login;
