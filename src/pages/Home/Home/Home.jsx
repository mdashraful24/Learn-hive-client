import { Helmet } from "react-helmet-async";
import Feedback from "../Feedback/Feedback";
import InspireTeachers from "../InspireTeachers/InspireTeachers";
import KeyFeatures from "../KeyFeatures/KeyFeatures";
import AboutUs from "./AboutUs/AboutUs";
import Banner from "./Banner/Banner";
import Partners from "./Partners/Partners";
import StatsSection from "./StatsSection/StatsSection";
import Testimonials from "./Testimonials/Testimonials";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | LearnHive</title>
            </Helmet>

            <Banner></Banner>
            <Partners></Partners>
            <Feedback></Feedback>
            <InspireTeachers></InspireTeachers>
            <StatsSection></StatsSection>
            <AboutUs></AboutUs>
            <KeyFeatures></KeyFeatures>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;