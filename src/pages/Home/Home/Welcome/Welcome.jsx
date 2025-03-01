import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Welcome = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);

    return (
        <div className="my-20 md:mt-32 md:mb-28">
            <section className="container mx-auto text-center px-2 md:px-3 lg:px-2.5">
                <div
                    data-aos="fade-up"
                    className="mx-auto w-full p-8 bg-gradient-to-r from-base-200 to-base-300 rounded-lg shadow-xl"
                >
                    <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
                        Welcome to LearnHive!
                    </h2>
                    <p className="lg:max-w-4xl mx-auto md:text-lg mb-4 leading-relaxed">
                        At LearnHive, we bridge the gap between educators, students, and institutions, creating a seamless platform for skill learning and class management.
                        Dive into a world of possibilities and make learning efficient, fun, and accessible for everyone.
                    </p>
                    {/* <button
                        data-aos="zoom-in"
                        className="mt-4 bg-[#491558] hover:bg-[#6a1a84] text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300"
                        onClick={() => console.log('Learn More button clicked')}
                    >
                        Learn More
                    </button> */}
                </div>
            </section>
        </div>
    );
};

export default Welcome;
