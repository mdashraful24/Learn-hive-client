import team from '../../../assets/home/team.jpg';

const Introduction = () => {
    return (
        <section className="relative mt-8 md:mt-10 container mx-auto mb-20 md:mb-28 px-2 md:px-3 lg:px-2.5">
            <div className="text-center">
                {/* Header Section */}
                <h2 className="text-2xl md:text-4xl font-extrabold mb-3">About Us</h2>
                <p className="md:text-lg mb-8">
                    LearnHive is transforming education by offering personalized learning experiences that empower students and educators alike.
                </p>

                {/* Main Content */}
                <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 p-7 border rounded-xl shadow-lg">
                    {/* Left Section - Image */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="rounded-lg overflow-hidden shadow-lg">
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
                            <h3 className="text-xl font-bold mb-3">Our Story</h3>
                            <p>
                                Founded by passionate educators, LearnHive bridges the gap between traditional learning and modern interactive education.
                                Our mission is to make knowledge accessible and engaging for everyone.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-bold mb-3">Our Vision</h3>
                            <p>
                                We strive to create a world where education is flexible, scalable, and accessible to all, fostering growth and collaboration.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-bold mb-3">Our Values</h3>
                            <p>
                                Integrity, innovation, and inclusively drive us. We believe in empowering learners and educators through a supportive and inspiring environment.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-3">Our Commitment</h3>
                            <p>
                                At LearnHive, we are committed to continuous learning, embracing technological advancements, and fostering a community of lifelong learners.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Introduction;
