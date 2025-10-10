import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
let cardImage =require('./../../assets/img/card.jpg')

function InfoCardsHamePage() {
  return (
    <section className="InfoCardsHamePage pt-5 pb-5">
      <div className="wrapper">
        <Card >
          <Card.Img variant="top" src={cardImage} />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="success">Go somewhere</Button>
          </Card.Body>
        </Card>
        <Card >
          <Card.Img variant="top" src={cardImage} />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="success">Go somewhere</Button>
          </Card.Body>
        </Card>
        <Card >
          <Card.Img variant="top" src={cardImage} />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="success">Go somewhere</Button>
          </Card.Body>
        </Card>
      </div>
    </section>
  );
}

export default InfoCardsHamePage;
