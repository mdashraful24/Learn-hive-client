import { Helmet } from "react-helmet-async";
import InspireTeachers from "../InspireTeachers/InspireTeachers";
import KeyFeatures from "../KeyFeatures/KeyFeatures";
import Banner from "./Banner/Banner";
import Partners from "./Partners/Partners";
import StatsSection from "./StatsSection/StatsSection";
import Testimonials from "./Testimonials/Testimonials";
// import Highlight from "./Highlight/Highlight";
import Welcome from "./Welcome/Welcome";
import Contacts from "../Contacts/Contacts";
import TopClasses from "./TopClasses/TopClasses";

const Home = () => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
    
    return (
        <div>
            <Helmet>
                <title>Home | LearnHive</title>
            </Helmet>

            <Banner></Banner>
            <Welcome></Welcome>
            {/* <Highlight></Highlight> */}
            <TopClasses></TopClasses>
            <Partners></Partners>
            <StatsSection></StatsSection>
            <InspireTeachers></InspireTeachers>
            <KeyFeatures></KeyFeatures>
            <Testimonials></Testimonials>
            <Contacts></Contacts>
        </div>
    );
};

export default Home;