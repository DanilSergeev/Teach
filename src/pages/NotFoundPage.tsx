import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main>
      <section className="wrapper mt-5">
        <h1>404 - Нет такой страницы</h1>
        <Link to="/">На главную</Link>
      </section>
    </main>
  );
}

export default NotFoundPage;
