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
        <div className="md:my-10">
            <section className="container mx-auto text-center px-2.5 py-12">
                <div
                    data-aos="fade-up"
                    className="mx-auto w-full p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg shadow-xl"
                >
                    <h2 className="text-2xl md:text-4xl font-extrabold text-[#491558] mb-4">
                        Welcome to LearnHive!
                    </h2>
                    <p className="lg:max-w-6xl mx-auto md:text-lg text-gray-700 mb-4 leading-relaxed">
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
