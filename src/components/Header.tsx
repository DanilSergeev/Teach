import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";

function Header() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let links = [
    { to: "/", title: "Главная" },
    { to: "/about", title: "О проекте" },
  ];

  return (
    <>
      <header>
        <button onClick={() => handleShow()} />
      </header>
      <Offcanvas show={show} onHide={handleClose} placement={"end"} >
        <Offcanvas.Header closeButton >
          <Offcanvas.Title >
            <Link to="/" onClick={() => handleClose()} className="headerLink">{`${process.env.REACT_APP_TITLE_PROJECT}`}</Link>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <hr />
        <Offcanvas.Body>
          {links.map((item) => (
            <Link key={item.to} to={item.to} onClick={() => handleClose()} className="headerLink">
              {item.title}
            </Link>
          ))}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Header;
