import { Fade } from "react-awesome-reveal";
import {
    BookOpenText,
    CalendarDays,
    Globe2,
    GraduationCap,
    Headphones,
    IndianRupee,
    LayoutDashboard,
    Sparkles,
    Users,
} from "lucide-react";

import inspire from '../../../../assets/home/inspire.jpg'

const InspireTeachers = () => {
    const benefits = [
        {
            icon: CalendarDays,
            title: "Flexible Schedule",
            description: "Choose when and how you want to teach.",
        },
        {
            icon: Globe2,
            title: "Reach More Students",
            description: "Connect with motivated learners from anywhere.",
        },
        {
            icon: LayoutDashboard,
            title: "Easy Management",
            description: "Manage courses, lessons, and students in one place.",
        },
        {
            icon: BookOpenText,
            title: "Earn From Your Skills",
            description: "Turn your knowledge and expertise into income.",
        },
    ];

    return (
        <section className="relative overflow-hidden mb-20 md:mb-24 py-16 lg:py-24 px-2 md:px-3 lg:px-2.5 bg-base-200">
            <div className="container relative mx-auto px-4 md:px-6 lg:px-8">
                {/* Heading */}
                <Fade direction="up" triggerOnce>
                    <div className="mx-auto mb-12 max-w-4xl text-center">
                        {/* <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
                            <Sparkles className="h-4 w-4" />
                            Share Your Knowledge
                        </div> */}

                        <h2 className="mb-5 text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">
                            Become a Teacher at{" "}
                            <span className="text-blue-600 dark:text-blue-400">
                                LearnHive
                            </span>
                        </h2>

                        <p className="mx-auto text-base leading-7 md:text-lg">
                            Turn your knowledge into meaningful learning
                            experiences. Teach what you love, connect with
                            passionate students, and grow your teaching journey
                            with LearnHive.
                        </p>
                    </div>
                </Fade>

                {/* Main Content */}
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    {/* Image */}
                    <Fade direction="left" triggerOnce>
                        <div className="relative">
                            {/* <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl" /> */}

                            <div className="relative overflow-hidden rounded-3xl border border-base-content/10 bg-base-100 p-2 shadow-2xl">
                                <img
                                    src={inspire}
                                    alt="Become a teacher at LearnHive"
                                    className="h-full w-full rounded-2xl object-cover"
                                />

                                {/* Floating Card */}
                                <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-base-100/90 p-3 shadow-xl backdrop-blur-md md:left-8 md:right-auto md:w-72">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
                                            <GraduationCap className="h-6 w-6" />
                                        </div>

                                        <div>
                                            <p className="font-bold">
                                                Teach. Inspire. Grow.
                                            </p>
                                            <p className="text-sm">
                                                Make an impact through learning.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fade>

                    {/* Content */}
                    <div>
                        {/* Benefits */}
                        <Fade cascade direction="right" triggerOnce>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {benefits.map((benefit) => {
                                    const Icon = benefit.icon;

                                    return (
                                        <div
                                            key={benefit.title}
                                            className="group rounded-2xl border border-base-content/10 bg-base-100 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-lg"
                                        >
                                            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white dark:text-blue-400">
                                                <Icon className="h-5 w-5" />
                                            </div>

                                            <h4 className="mb-2 text-lg font-bold">
                                                {benefit.title}
                                            </h4>

                                            <p className="leading-6">
                                                {benefit.description}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </Fade>

                        {/* CTA */}
                        <Fade direction="up" triggerOnce>
                            <div className="mt-8">
                                <a
                                    href="/tech"
                                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30 sm:w-auto"
                                >
                                    Become a Teacher
                                    <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
                                        →
                                    </span>
                                </a>
                            </div>
                        </Fade>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InspireTeachers;



// import { Fade } from 'react-awesome-reveal';
// import inspire from '../../../../assets/home/inspire.jpg'

// const InspireTeachers = () => {
//     return (
//         <div className="mb-20 md:mb-24 p-12 px-2 md:px-3 lg:px-2.5 bg-base-200">
//             <h2 className="text-2xl md:text-4xl text-center font-extrabold mb-5">Become a Teacher at LearnHive</h2>
//             <p className="md:max-w-2xl lg:max-w-4xl md:text-lg mx-auto text-center  mb-14">
//                 Join our platform and help students achieve their learning goals. With LearnHive, you get the flexibility to teach the skills you’re passionate about, from anywhere in the world.
//             </p>
//             <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-10 lg:px-4">
//                 <div className="flex justify-center items-center">
//                     <img
//                         src={inspire}
//                         alt="Teach on LearnHive"
//                         className="rounded-lg shadow-lg"
//                     />
//                 </div>
//                 <div className="flex flex-col justify-center overflow-hidden">
//                     <div className='px-5'>
//                         <Fade direction="right" triggerOnce>
//                             <h3 className="text-xl font-semibold mb-4">Why Teach with Us?</h3>
//                         </Fade>
//                         <Fade cascade direction="right" triggerOnce>
//                             <ul className="list-disc list-inside space-y-4 md:text-lg">
//                                 <li>
//                                     Flexible scheduling and the ability to teach from anywhere.
//                                 </li>
//                                 <li>
//                                     Reach a global audience of motivated students.
//                                 </li>
//                                 <li>
//                                     Share your knowledge and teach subjects you are passionate about.
//                                 </li>
//                                 <li>
//                                     Create and manage your own courses and learning materials.
//                                 </li>
//                                 <li>
//                                     Connect with students and provide personalized learning support.
//                                 </li>
//                                 <li>
//                                     Use a user-friendly platform to manage your teaching activities.
//                                 </li>
//                                 <li>
//                                     Track your students, lessons, and teaching progress with ease.
//                                 </li>
//                                 <li>
//                                     Get paid securely for your expertise, time, and efforts.
//                                 </li>
//                                 <li>
//                                     Build your teaching profile and grow your reputation on LearnHive.
//                                 </li>
//                             </ul>
//                         </Fade>
//                     </div>
//                     <a
//                         href="/tech"
//                         className="btn bg-blue-600 hover:bg-blue-700 mt-6 md:mt-8 text-white rounded-full md:text-xl text-center font-semibold"
//                     >
//                         Become a Teacher
//                     </a>
//                 </div>
//                 {/* <div className="flex flex-col justify-center">
//                     <h3 className="text-2xl font-semibold mb-4">Why Teach with Us?</h3>
//                     <ul className="list-disc list-inside space-y-4 md:text-lg">
//                         <li className="">Flexible scheduling and the ability to teach from anywhere.</li>
//                         <li className="">Reach a global audience of motivated students.</li>
//                         <li className="">Use a user-friendly platform to deliver your lessons.</li>
//                         <li className="">Get paid for your expertise and efforts.</li>
//                     </ul>
//                     <a
//                         href="/tech"
//                         className="btn btn-neutral hover:bg-black mt-6 text-white rounded-full md: md:text-xl text-center font-semibold"
//                     >
//                         Become a Teacher
//                     </a>
//                 </div> */}
//             </div>
//         </div>
//     );
// };

// export default InspireTeachers;