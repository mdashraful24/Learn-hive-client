import { Helmet } from 'react-helmet-async';
import team from '../../assets/home/team.jpg';

const AboutUs = () => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
    
    return (
        <section className="relative mt-8 md:mt-10 mb-28 px-2.5">
            <Helmet>
                <title>About Us | LearnHive</title>
            </Helmet>

            <div className="container mx-auto text-center">
                {/* Header Section */}
                <h2 className="text-2xl md:text-4xl font-extrabold mb-5">About Us</h2>
                <p className="mb-8 md:text-lg lg:w-3/5 mx-auto">
                    LearnHive is transforming education by offering personalized learning experiences that empower students and educators alike.
                </p>

                {/* Main Content */}
                <div className="flex flex-col lg:flex-row gap-8 md:gap-12 bg-white dark:bg-gray-900 p-7 md:p-10 rounded-2xl shadow-lg">
                    {/* Left Section - Image */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="rounded-xl overflow-hidden shadow-lg">
                            <img
                                src={team}
                                alt="Our Team"
                                className="w-full h-full object-cover transform hover:scale-105 transition duration-500 ease-in-out"
                            />
                        </div>
                    </div>

                    {/* Right Section - Content */}
                    <div className="w-full lg:w-1/2 text-justify">
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Our Story</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                Founded by passionate educators, LearnHive bridges the gap between traditional learning and modern interactive education.
                                Our mission is to make knowledge accessible and engaging for everyone.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Our Vision</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                We strive to create a world where education is flexible, scalable, and accessible to all, fostering growth and collaboration.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Our Values</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                Integrity, innovation, and inclusivity drive us. We believe in empowering learners and educators through a supportive and inspiring environment.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
