import { Button } from "react-bootstrap";
const image = require("../../assets/img/line");

function HomeAboutUsComponents() {
  return (
    <section>
      <div className="HomeAboutUsComponents wrapper pt-5 pb-5">
        <div>
          <h3>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</h3>
          <h6>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
            delectus architecto dolorum repellat quisquam. Odio, omnis
            temporibus? Totam impedit harum, sit omnis dolore mollitia iusto
            amet id, esse exercitationem fuga?
          </h6>
          <Button variant="outline-success">Подробнее</Button>
        </div>
        <div>
          <img src={image} alt="" />
        </div>
      </div>
{/*  */}
      <div className="HomeAboutUsComponents wrapper pt-5 pb-5">
        <div>
          <img src={image} alt="" />
        </div>
        <div>
          <h3>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</h3>
          <h6>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
            delectus architecto dolorum repellat quisquam. Odio, omnis
            temporibus? Totam impedit harum, sit omnis dolore mollitia iusto
            amet id, esse exercitationem fuga?
          </h6>
          <Button variant="outline-success">Подробнее</Button>
        </div>
      </div>
{/*  */}
      <div className="HomeAboutUsComponents wrapper pt-5 pb-5">
        <div>
          <h3>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</h3>
          <h6>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
            delectus architecto dolorum repellat quisquam. Odio, omnis
            temporibus? Totam impedit harum, sit omnis dolore mollitia iusto
            amet id, esse exercitationem fuga?
          </h6>
          <Button variant="outline-success">Подробнее</Button>
        </div>
        <div>
          <img src={image} alt="" />
        </div>
      </div>
{/*  */}

    </section>
  );
}

export default HomeAboutUsComponents;
