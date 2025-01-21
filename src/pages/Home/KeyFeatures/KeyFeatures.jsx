import React from "react";
import { Parallax } from "react-parallax";
import { FaChalkboardTeacher, FaUserGraduate, FaUsers, FaChartLine, FaAward, FaGlobe } from "react-icons/fa";
// import features from "../../../assets/features.jpg";
import features from "../../../assets/home/image.jpg";

const KeyFeatures = () => {
    return (
        <Parallax
            bgImage={features}
            strength={300}
            bgImageAlt="Key Features Background"
        >
            <div className="bg-black bg-opacity-60 py-12 px-5">
                <div className="text-center">
                    <div className="text-white">
                        <h2 className="text-4xl font-extrabold mb-5">Key Features</h2>
                        <p className="lg:w-1/2 text-lg mx-auto mb-12">
                            Discover the powerful features that make LearnHive a leading platform for online education. We offer tools and resources to help you learn and grow.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {/* Feature 1 */}
                        <div className="bg-gray-50 bg-opacity-90 p-8 rounded-xl shadow-lg hover:scale-105 transform transition duration-300 ease-in-out">
                            <div className="flex items-center justify-center mb-6">
                                <FaChalkboardTeacher size={64} />
                            </div>
                            <h3 className="text-2xl font-semibold mb-4">Interactive Learning</h3>
                            <p className="text-lg text-gray-700">
                                Engage with live classes, quizzes, and real-time feedback to keep the learning process fun and effective.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-gray-50 bg-opacity-90 p-8 rounded-xl shadow-lg hover:scale-105 transform transition duration-300 ease-in-out">
                            <div className="flex items-center justify-center mb-6">
                                <FaUserGraduate size={64} />
                            </div>
                            <h3 className="text-2xl font-semibold mb-4">Personalized Experience</h3>
                            <p className="text-lg text-gray-700">
                                Get recommendations and learning paths tailored to your skill level and interests, ensuring maximum growth.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-gray-50 bg-opacity-90 p-8 rounded-xl shadow-lg hover:scale-105 transform transition duration-300 ease-in-out">
                            <div className="flex items-center justify-center mb-6">
                                <FaUsers size={64} />
                            </div>
                            <h3 className="text-2xl font-semibold mb-4">Collaborative Learning</h3>
                            <p className="text-lg text-gray-700">
                                Join group discussions, collaborative projects, and peer interactions to enhance the learning experience.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="bg-gray-50 bg-opacity-90 p-8 rounded-xl shadow-lg hover:scale-105 transform transition duration-300 ease-in-out">
                            <div className="flex items-center justify-center mb-6">
                                <FaChartLine size={64} />
                            </div>
                            <h3 className="text-2xl font-semibold mb-4">Progress Tracking</h3>
                            <p className="text-lg text-gray-700">
                                Track your progress and achievements with built-in analytics and reports, ensuring you're always on the right path.
                            </p>
                        </div>

                        {/* Feature 5 */}
                        <div className="bg-gray-50 bg-opacity-90 p-8 rounded-xl shadow-lg hover:scale-105 transform transition duration-300 ease-in-out">
                            <div className="flex items-center justify-center mb-6">
                                <FaAward size={64} />
                            </div>
                            <h3 className="text-2xl font-semibold mb-4">Certification & Rewards</h3>
                            <p className="text-lg text-gray-700">
                                Earn certifications and badges for completed courses and milestones, showcasing your skills to the world.
                            </p>
                        </div>

                        {/* Feature 6 */}
                        <div className="bg-gray-50 bg-opacity-90 p-8 rounded-xl shadow-lg hover:scale-105 transform transition duration-300 ease-in-out">
                            <div className="flex items-center justify-center mb-6 ">
                                <FaGlobe size={64} />
                            </div>
                            <h3 className="text-2xl font-semibold mb-4">Global Community</h3>
                            <p className="text-lg text-gray-700">
                                Connect with a diverse, global community of learners and educators, exchanging knowledge and ideas.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Parallax>
    );
};

export default KeyFeatures;
