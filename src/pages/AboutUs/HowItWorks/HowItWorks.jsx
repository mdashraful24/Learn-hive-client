import { useSpring, animated } from "@react-spring/web";
import { Link, useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import useAuth from "../../../hooks/useAuth";

const HowItWorks = () => {
    const { user } = useAuth(); // Get user authentication state
    const navigate = useNavigate();
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

    const steps = [
        {
            title: "Sign Up & Create Profile",
            description: "Create your personalized profile as a student or tutor to get started.",
            icon: "sign-in-alt",
        },
        {
            title: "Browse or Create Courses",
            description: "Explore existing courses or create your own to teach others.",
            icon: "book-open",
        },
        {
            title: "Enroll or Teach",
            description: "Enroll in your desired course or start teaching to share your knowledge.",
            icon: "chalkboard-teacher",
        },
        {
            title: "Track Progress",
            description: "Keep track of your progress and achievements through your dashboard.",
            icon: "trophy",
        },
    ];

    return (
        <div ref={ref} className="mb-20 md:mb-24 px-2 md:px-3 lg:px-2.5">
            <h2 className="text-2xl md:text-4xl font-extrabold text-center mb-4">How LearnHive Works</h2>
            <div className="w-28 mx-auto border-b-4 border-blue-700 mb-8"></div>

            {/* Steps Section */}
            <div className="flex flex-col lg:flex-row flex-wrap justify-center gap-8 lg:gap-12">
                {steps.map((step, index) => {
                    const style = useSpring({
                        opacity: inView ? 1 : 0,
                        transform: inView ? "translateY(0px)" : "translateY(30px)",
                        delay: index * 300,
                        config: { tension: 200, friction: 18, mass: 1.2 },
                    });

                    return (
                        <animated.div
                            key={index}
                            style={style}
                            className="w-full lg:w-1/4 p-6 border rounded-xl shadow-xl transform hover:scale-105 transition-all duration-500"
                        >
                            <div className="flex items-center justify-center mb-4">
                                <i className={`fas fa-${step.icon} text-4xl text-blue-600`} />
                            </div>
                            <h3 className="text-xl font-semibold text-center mb-2">{step.title}</h3>
                            <p className="text-center">{step.description}</p>
                        </animated.div>
                    );
                })}
            </div>

            {/* Conditional Button Section */}
            <div className="mt-10 text-center">
                {user ? (
                    // If user is logged in, show "Explore Our Classes" button
                    <button
                        onClick={() => navigate("/allClasses")}
                        className="mt-6 px-6 py-3 text-white font-medium bg-blue-600 rounded-full shadow-md hover:bg-blue-700 transition-all duration-300"
                    >
                        Explore Our Classes
                    </button>
                ) : (
                    // If user is NOT logged in, show "Sign Up Now" CTA
                    <>
                        <h3 className="text-xl font-bold">Ready to Create Your Profile?</h3>
                        <p className="mt-2">Start your journey today and unlock endless learning opportunities!</p>
                        <Link to={"/signup"}>
                            <button
                                onClick={() => navigate("/register")}
                                className="mt-6 px-6 py-3 text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 transition-all duration-300"
                            >
                                Sign Up Now
                            </button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default HowItWorks;
