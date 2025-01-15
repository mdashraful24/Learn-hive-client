import React from "react";

const KeyFeatures = () => {
    return (
        <section className="bg-white mb-20 px-6">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-8">Key Features</h2>
                <p className="text-lg text-gray-600 mb-12">
                    Discover the powerful features that make LearnHive a leading platform for online education. We offer tools and resources to help you learn and grow.
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {/* Feature 1 */}
                    <div className="bg-gradient-to-tl from-indigo-500 via-purple-500 to-pink-500 p-8 rounded-xl shadow-lg text-white hover:scale-105 transform transition duration-300 ease-in-out">
                        <div className="flex items-center justify-center mb-6">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-16 w-16 text-yellow-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-semibold mb-4">Interactive Learning</h3>
                        <p className="text-lg">
                            Engage with live classes, quizzes, and real-time feedback to keep the learning process fun and effective.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-gradient-to-tl from-green-500 via-teal-500 to-blue-500 p-8 rounded-xl shadow-lg text-white hover:scale-105 transform transition duration-300 ease-in-out">
                        <div className="flex items-center justify-center mb-6">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-16 w-16 text-yellow-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 17l3 3 3-3"
                                />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-semibold mb-4">Personalized Experience</h3>
                        <p className="text-lg">
                            Get recommendations and learning paths tailored to your skill level and interests, ensuring maximum growth.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-gradient-to-tl from-yellow-500 via-orange-500 to-red-500 p-8 rounded-xl shadow-lg text-white hover:scale-105 transform transition duration-300 ease-in-out">
                        <div className="flex items-center justify-center mb-6">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-16 w-16 text-yellow-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-semibold mb-4">Collaborative Learning</h3>
                        <p className="text-lg">
                            Join group discussions, collaborative projects, and peer interactions to enhance the learning experience.
                        </p>
                    </div>

                    {/* Feature 4 */}
                    <div className="bg-gradient-to-tl from-blue-600 via-indigo-600 to-purple-600 p-8 rounded-xl shadow-lg text-white hover:scale-105 transform transition duration-300 ease-in-out">
                        <div className="flex items-center justify-center mb-6">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-16 w-16 text-yellow-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M7 8l5 5 5-5"
                                />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-semibold mb-4">Progress Tracking</h3>
                        <p className="text-lg">
                            Track your progress and achievements with built-in analytics and reports, ensuring you're always on the right path.
                        </p>
                    </div>

                    {/* Feature 5 */}
                    <div className="bg-gradient-to-tl from-red-500 via-pink-500 to-purple-600 p-8 rounded-xl shadow-lg text-white hover:scale-105 transform transition duration-300 ease-in-out">
                        <div className="flex items-center justify-center mb-6">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-16 w-16 text-yellow-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 20l8-8-8-8-8 8 8 8z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-semibold mb-4">Certification & Rewards</h3>
                        <p className="text-lg">
                            Earn certifications and badges for completed courses and milestones, showcasing your skills to the world.
                        </p>
                    </div>

                    {/* Feature 6 */}
                    <div className="bg-gradient-to-tl from-teal-500 via-cyan-500 to-blue-500 p-8 rounded-xl shadow-lg text-white hover:scale-105 transform transition duration-300 ease-in-out">
                        <div className="flex items-center justify-center mb-6">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-16 w-16 text-yellow-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 16v-4m0 0l-2-2m2 2l2-2"
                                />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-semibold mb-4">Global Community</h3>
                        <p className="text-lg">
                            Connect with a diverse, global community of learners and educators, exchanging knowledge and ideas.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default KeyFeatures;
