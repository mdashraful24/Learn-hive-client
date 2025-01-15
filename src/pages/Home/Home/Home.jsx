import Feedback from "../Feedback/Feedback";
import InspireTeachers from "../InspireTeachers/InspireTeachers";
import KeyFeatures from "../KeyFeatures/KeyFeatures";
import AboutUs from "./AboutUs/AboutUs";
import Banner from "./Banner/Banner";
import Partners from "./Partners/Partners";
import StatsSection from "./StatsSection/StatsSection";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Partners></Partners>
            <Feedback></Feedback>
            <InspireTeachers></InspireTeachers>
            <StatsSection></StatsSection>
            <AboutUs></AboutUs>
            <KeyFeatures></KeyFeatures>
        </div>
    );
};

export default Home;