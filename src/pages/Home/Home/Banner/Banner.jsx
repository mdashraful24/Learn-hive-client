import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { FaArrowLeft, FaArrowRight, FaArrowUp } from "react-icons/fa";

import img1 from "../../../../assets/banner/banner1.jpg";
import img2 from "../../../../assets/banner/banner3.jpg";
import img3 from "../../../../assets/banner/banner6.jpg";
import img4 from "../../../../assets/banner/banner5.jpg";

const slides = [
    {
        image: img1,
        badge: "Learn Without Limits",
        title: "Build Skills That Shape Your Future.",
        description:
            "Learn from experienced tutors, explore engaging courses, and take your skills to the next level with LearnHive.",
    },
    {
        image: img2,
        badge: "Learn From Experts",
        title: "Knowledge From the Right People.",
        description:
            "Connect with skilled tutors who make learning practical, interactive, and easier to understand.",
    },
    {
        image: img3,
        badge: "Explore & Grow",
        title: "Discover Courses Made for You.",
        description:
            "Explore thoughtfully designed courses and learn at your own pace with resources that support your goals.",
    },
    {
        image: img4,
        badge: "Your Journey Starts Here",
        title: "Learn Today. Grow Tomorrow.",
        description:
            "Join a modern learning community where students and tutors connect, collaborate, and grow together.",
    },
];

const Banner = () => {
    return (
        <section className="relative overflow-hidden bg-slate-50">
            {/* Decorative Background */}
            <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8 lg:py-16">
                <Carousel
                    infiniteLoop
                    autoPlay
                    interval={4500}
                    transitionTime={600}
                    stopOnHover
                    swipeable
                    emulateTouch
                    useKeyboardArrows
                    showThumbs={false}
                    showStatus={false}
                    showIndicators
                    renderArrowPrev={(clickHandler, hasPrev) =>
                        hasPrev && (
                            <button
                                type="button"
                                onClick={clickHandler}
                                aria-label="Previous slide"
                                className="absolute bottom-5 left-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-300 hover:bg-slate-900 hover:text-white md:bottom-8 md:left-auto md:right-20"
                            >
                                <FaArrowLeft className="text-xs" />
                            </button>
                        )
                    }
                    renderArrowNext={(clickHandler, hasNext) =>
                        hasNext && (
                            <button
                                type="button"
                                onClick={clickHandler}
                                aria-label="Next slide"
                                className="absolute bottom-5 right-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-300 hover:bg-slate-900 hover:text-white md:bottom-8 md:right-8"
                            >
                                <FaArrowRight className="text-xs" />
                            </button>
                        )
                    }
                >
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className="grid min-h-[500px] items-center gap-10 pb-20 text-left md:min-h-[560px] lg:grid-cols-2 lg:gap-16 lg:pb-8"
                        >
                            {/* Left Content */}
                            <div className="order-2 lg:order-1">
                                {/* Badge */}
                                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
                                    <span className="h-2 w-2 rounded-full bg-primary" />
                                    {slide.badge}
                                </div>

                                {/* Heading */}
                                <h1 className="max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-[4rem]">
                                    {slide.title}
                                </h1>

                                {/* Description */}
                                <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
                                    {slide.description}
                                </p>

                                {/* CTA */}
                                <div className="mt-8 flex flex-wrap items-center gap-4">
                                    <button
                                        type="button"
                                        className="rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary md:px-7"
                                    >
                                        Explore Courses
                                    </button>

                                    <button
                                        type="button"
                                        className="rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-slate-900 hover:text-slate-900 md:px-7"
                                    >
                                        Find a Tutor
                                    </button>
                                </div>

                                {/* Trust Stats */}
                                <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-slate-200 pt-6">
                                    <div>
                                        <p className="text-xl font-bold text-slate-900">100+</p>
                                        <p className="text-xs text-slate-500">
                                            Learning Resources
                                        </p>
                                    </div>

                                    <div className="h-8 w-px bg-slate-200" />

                                    <div>
                                        <p className="text-xl font-bold text-slate-900">50+</p>
                                        <p className="text-xs text-slate-500">Expert Tutors</p>
                                    </div>

                                    <div className="h-8 w-px bg-slate-200" />

                                    <div>
                                        <p className="text-xl font-bold text-slate-900">1K+</p>
                                        <p className="text-xs text-slate-500">Active Learners</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Visual */}
                            <div className="order-1 flex items-center justify-center lg:order-2">
                                <div className="relative w-full max-w-xl">
                                    {/* Main Image Card */}
                                    <div className="relative overflow-hidden rounded-[2rem] bg-white p-3 shadow-2xl shadow-slate-900/10">
                                        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
                                            <img
                                                src={slide.image}
                                                alt={slide.title}
                                                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                                            />

                                            {/* Image Gradient */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                        </div>
                                    </div>

                                    {/* Floating Learning Card */}
                                    <div className="absolute -bottom-5 -left-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:-left-8">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                                <FaArrowUp />
                                            </div>

                                            <div>
                                                <p className="text-xs text-slate-500">
                                                    Keep learning
                                                </p>
                                                <p className="text-sm font-bold text-slate-900">
                                                    Grow your skills
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Floating Course Card */}
                                    <div className="absolute -right-3 -top-5 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-xl sm:-right-6">
                                        <p className="text-xs text-slate-500">Popular</p>
                                        <p className="mt-1 text-sm font-bold text-slate-900">
                                            Featured Courses
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </section>
    );
};

export default Banner;