import CommonLine from "../components/GeneralComponents/CommonLine";
import CommonMap from "../components/GeneralComponents/CommonMap";
import HomeAboutUsComponents from "../components/Home/HomeAboutUsComponents";
import WelcomeHomeComponents from "../components/Home/WelcomeHomeComponents";

function HomePage() {
  return (
    <main>
        <WelcomeHomeComponents/>
        <HomeAboutUsComponents/>
        <CommonMap/> 
        <CommonLine title="Lorem ipsome" text="Lorem ipsum dolor sit amet consectetur adipisicing elit."/>
    </main>
  );
}

export default HomePage;
