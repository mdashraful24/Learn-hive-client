import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import img1 from "../../../../assets/banner/banner1.jpg";
import img2 from "../../../../assets/banner/banner3.jpg";
import img3 from "../../../../assets/banner/banner6.jpg";
import useAuth from "../../../../hooks/useAuth";

const Banner = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const scrollToNext = () => {
        const next = document.getElementById("next-section");
        if (next) next.scrollIntoView({ behavior: "smooth" });
    };

    const handleGetStarted = () => {
        if (user) {
            scrollToNext();
        } else {
            navigate("/login");
        }
    };

    const handleAllClasses = () => {
        navigate("/aboutUs");
    };

    const handleContactUs = () => {
        navigate("/contact");
    };

    const handleBrowseCourses = () => {
        navigate("/allClasses");
    };

    const handleViewCommunity = () => {
        navigate("/signUp");
    };

    // Slide data with unique titles, descriptions, and conditional buttons
    const slides = [
        {
            image: img1,
            title: "Start Your Learning Journey",
            description: "Explore multiple courses from expert instructors. Learn at your own pace and achieve your goals.",
            buttons: user ? [
                {
                    text: "About Us",
                    onClick: handleAllClasses,
                    className: "bg-white text-gray-800 hover:bg-gray-100",
                },
            ] : [
                {
                    text: "About Us",
                    onClick: handleAllClasses,
                    className: "bg-indigo-600 text-white hover:bg-indigo-700",
                },
                {
                    text: "Get Started",
                    onClick: handleGetStarted,
                    className: "bg-white text-gray-800 hover:bg-gray-100",
                },
            ]
        },
        {
            image: img2,
            title: "Master New Skills Today",
            description: "From programming to design, find the perfect course to boost your career and personal growth.",
            buttons: user ? [
                {
                    text: "Explore Courses",
                    onClick: handleBrowseCourses,
                    className: "bg-emerald-600 text-white hover:bg-emerald-700",
                }
            ] : [
                {
                    text: "Explore Courses",
                    onClick: handleBrowseCourses,
                    className: "bg-emerald-600 text-white hover:bg-emerald-700",
                },
                {
                    text: "Contact Us",
                    onClick: handleContactUs,
                    className: "bg-white text-gray-800 hover:bg-gray-100",
                },
            ]
        },
        {
            image: img3,
            title: "Join Our Community",
            description: "Connect with millions of learners worldwide. Share knowledge, collaborate, and grow together.",
            buttons: user ? [
                {
                    text: "Contact Us",
                    onClick: handleContactUs,
                    className: "bg-rose-600 text-white hover:bg-rose-700",
                },
            ] : [
                {
                    text: "Join Community",
                    onClick: handleViewCommunity,
                    className: "bg-rose-600 text-white hover:bg-rose-700",
                },
                {
                    text: "Contact Us",
                    onClick: handleContactUs,
                    className: "bg-white text-gray-800 hover:bg-gray-100",
                },
            ]
        },
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    const buttonVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    };

    return (
        <section id="banner" className="relative overflow-hidden">
            <Carousel
                infiniteLoop
                useKeyboardArrows
                autoPlay
                showThumbs={false}
                showStatus={false}
                showIndicators={false}
                dynamicHeight={false}
                swipeable
                emulateTouch
                interval={4000}
                transitionTime={600}
                stopOnHover
                renderArrowPrev={(clickHandler) => (
                    <button
                        className="hidden md:block absolute top-1/2 left-5 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full shadow-lg z-20 hover:bg-opacity-70 transition-all"
                        onClick={clickHandler}
                    >
                        &lt;
                    </button>
                )}
                renderArrowNext={(clickHandler) => (
                    <button
                        className="hidden md:block absolute top-1/2 right-5 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full shadow-lg z-20 hover:bg-opacity-70 transition-all"
                        onClick={clickHandler}
                    >
                        &gt;
                    </button>
                )}
            >
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className="relative h-[60vh] lg:h-[70vh] flex items-center justify-center"
                    >
                        <img
                            src={slide.image}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-full"
                        />
                        {/* Dark overlay for contrast */}
                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                        {/* Gradient overlay for better text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>

                        {/* Content with animations */}
                        <motion.div
                            className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 max-w-4xl mx-auto"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            key={index} // Re-trigger animation on slide change
                        >
                            <motion.h1
                                variants={itemVariants}
                                className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
                            >
                                {slide.title}
                            </motion.h1>

                            <motion.p
                                variants={itemVariants}
                                className="text-base md:text-xl lg:text-2xl mb-8 max-w-2xl text-gray-200"
                            >
                                {slide.description}
                            </motion.p>

                            {/* CTA Buttons per slide */}
                            <motion.div
                                variants={itemVariants}
                                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center"
                            >
                                {slide.buttons.map((button, btnIndex) => (
                                    <motion.button
                                        key={btnIndex}
                                        variants={buttonVariants}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`px-6 py-3 rounded-full shadow-lg transition-colors font-semibold min-w-[140px] ${button.className}`}
                                        onClick={button.onClick}
                                    >
                                        {button.text}
                                    </motion.button>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                ))}
            </Carousel>

            {/* Scroll indicator */}
            <motion.button
                className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white z-10"
                onClick={scrollToNext}
                aria-label="Scroll to next section"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                whileHover={{ y: -5 }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 animate-bounce"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </motion.button>
        </section>
    );
};

export default Banner;
