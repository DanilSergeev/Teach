import { Button } from "react-bootstrap";

const welcomeImage = require('../../assets/img/welcome.jpg');

function WelcomeHomeComponents() {
  return (
    <section className="WelcomeHomeComponents" style={{ backgroundImage: `url(${welcomeImage})`}}>
        <div className="wrapper">
            <p>Lorem ipsum dolor sit amet.</p>
            <h1>Lorem ipsum dolor sit amet.</h1>
            <h6>Lorem ipsum dolor, sit amet consectetur adipisicing.</h6>
            <Button variant="success" >Узнать больше</Button>
        </div>
    </section>
  );
}

export default WelcomeHomeComponents;
