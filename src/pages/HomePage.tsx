import CommonLine from "../components/GeneralComponents/CommonLine";
import CommonMap from "../components/GeneralComponents/CommonMap";
import HomeAboutUsComponents from "../components/Home/HomeAboutUsComponents";
import InfoCardsHamePage from "../components/Home/InfoCardsHamePage";
import WelcomeHomeComponents from "../components/Home/WelcomeHomeComponents";

function HomePage() {
  return (
    <main>
        <WelcomeHomeComponents/>
        <HomeAboutUsComponents/>
        <CommonLine title="Lorem ipsome" text="Lorem ipsum dolor sit amet consectetur adipisicing elit."/>
        <InfoCardsHamePage/>
        <CommonMap/> 
    </main>
  );
}

export default HomePage;