import { Button, Form } from "react-bootstrap";
let image = require('../assets/img/welcome.jpg')


function AuthFormPage() {
  return (
    <main className="AuthFormPage">
      <section className="wrapper">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>


          <Button variant="success" type="submit">
            Submit
          </Button>
        </Form>
        <div style={{backgroundImage:`url(${image})`}}>
            <h2>Форма авторизации</h2>
        </div>
      </section>
    </main>
  );
}

export default AuthFormPage;