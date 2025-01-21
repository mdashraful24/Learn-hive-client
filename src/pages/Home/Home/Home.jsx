import { Helmet } from "react-helmet-async";
import Feedback from "../Feedback/Feedback";
import InspireTeachers from "../InspireTeachers/InspireTeachers";
import KeyFeatures from "../KeyFeatures/KeyFeatures";
import AboutUs from "./AboutUs/AboutUs";
import Banner from "./Banner/Banner";
import Partners from "./Partners/Partners";
import StatsSection from "./StatsSection/StatsSection";
import Testimonials from "./Testimonials/Testimonials";
import Highlight from "./Highlight/Highlight";
import Welcome from "./Welcome/Welcome";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | LearnHive</title>
            </Helmet>

            <Banner></Banner>
            <Welcome></Welcome>
            <AboutUs></AboutUs>
            <Partners></Partners>
            <Highlight></Highlight>
            <InspireTeachers></InspireTeachers>
            <StatsSection></StatsSection>
            <KeyFeatures></KeyFeatures>
            <Testimonials></Testimonials>
            <Feedback></Feedback>
        </div>
    );
};

export default Home;