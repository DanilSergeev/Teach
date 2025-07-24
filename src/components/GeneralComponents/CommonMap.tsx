import { FC } from "react";

const CommonMap: FC = () => {
  return (
    <section>
      <iframe
        src="https://yandex.ru/map-widget/v1/?um=constructor%3Aa780f28655670fc8026de8085aa56f7d2b0e53241ad8802539fc861b5482b1ad&scroll=false&source=constructor"
        width="100%"
        height="530"
        title="Yandex map showing location"
      ></iframe>
    </section>
  );
};

export default CommonMap;
