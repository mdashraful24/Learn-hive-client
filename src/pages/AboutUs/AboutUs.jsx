import { Helmet } from "react-helmet-async";
import Introduction from "./Introduction/Introduction";
import HowItWorks from "./HowItWorks/HowItWorks";
import TheTeam from "./TheTeam/TheTeam";

const AboutUs = () => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);

    return (
        <div>
            <Helmet>
                <title>About Us | LearnHive</title>
            </Helmet>

            <Introduction></Introduction>
            <TheTeam></TheTeam>
            <HowItWorks></HowItWorks>
        </div>
    );
};

export default AboutUs;