import React from "react";

const Welcome = () => {
    return (
        <section className="my-20 px-4 md:my-24">
            <div className="container mx-auto">
                <div className="relative overflow-hidden rounded-3xl px-6 py-12 text-center shadow-md md:px-12 md:py-16 bg-base-200"
                >
                    {/* Background decoration */}
                    <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-200/40 blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-indigo-200/40 blur-3xl" />

                    {/* Content */}
                    <div className="relative z-10 mx-auto max-w-4xl">
                        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 px-4 py-2 font-semibold text-blue-500 shadow-md">
                            <span className="h-2 w-2 rounded-full bg-blue-500" />
                            Learn • Grow • Succeed
                        </span>

                        <h2 className="mb-5 text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">
                            Welcome to{" "}
                            <span className="text-blue-600">LearnHive</span>
                        </h2>

                        <p className="mx-auto max-w-4xl text-base leading-7 md:text-lg md:leading-8">
                            At LearnHive, we connect educators, students, and
                            institutions through a seamless learning
                            platform. Discover new skills, collaborate with
                            expert educators, and make your learning journey
                            smarter and more engaging.
                        </p>

                        <div className="mt-6 flex flex-wrap justify-center gap-4">
                            <span className="rounded-full border-b px-4 py-2 text-md font-medium shadow-md">
                                🎓 Personalized Learning
                            </span>

                            <span className="rounded-full border-b px-4 py-2 text-md font-medium shadow-md">
                                👨‍🏫 Expert Educators
                            </span>

                            <span className="rounded-full border-b px-4 py-2 text-md font-medium shadow-md">
                                🚀 Smarter Education
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Welcome;




// import React, { useEffect } from 'react';
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// const Welcome = () => {
//     useEffect(() => {
//         AOS.init({
//             duration: 1000,
//             easing: 'ease-in-out',
//             once: true,
//         });
//     }, []);

//     return (
//         <div className="my-20 md:mt-32 md:mb-28">
//             <section className="container mx-auto text-center px-2 md:px-3 lg:px-2.5">
//                 <div
//                     data-aos="fade-up"
//                     className="mx-auto w-full p-8 bg-gradient-to-r from-blue-300 to-blue-500 rounded-lg shadow-xl"
//                 >
//                     <h2 className="text-3xl md:text-5xl text-black font-extrabold mb-4">
//                         Welcome to LearnHive!
//                     </h2>
//                     <p className="lg:max-w-4xl mx-auto md:text-lg text-black mb-4 leading-relaxed">
//                         At LearnHive, we bridge the gap between educators, students, and institutions, creating a seamless platform for skill learning and class management.
//                         Dive into a world of possibilities and make learning efficient, fun, and accessible for everyone.
//                     </p>
//                 </div>
//             </section>
//         </div>
//     );
// };

// export default Welcome;
