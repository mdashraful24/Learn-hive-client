import team from '../../../../assets/home/team.jpg'

const AboutUs = () => {
    return (
        <section className="mb-20">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-extrabold mb-4">About Us</h2>
                <p className="text-lg mb-8 lg:w-2/3 mx-auto">
                    LearnHive is transforming the way education works, offering personalized learning experiences for students and educators alike.
                    Our mission is to empower learners with the skills they need to succeed in the modern world.
                </p>

                {/* Main Content Layout */}
                <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
                    {/* Left side - Image */}
                    <div className="w-full lg:w-1/2">
                        <img
                            src={team}
                            alt="About Us"
                            className="rounded-xl shadow-lg w-full object-cover"
                        />
                    </div>

                    {/* Right side - Text */}
                    <div className="w-full lg:w-1/2">
                        <h3 className="text-2xl font-bold mb-4">Our Story</h3>
                        <p className="text-lg mb-6">
                            We started as a small group of passionate educators who wanted to create a platform that could bridge the gap between
                            traditional learning and modern, interactive online education. Our journey has been fueled by a deep desire to make
                            learning more accessible and engaging for everyone.
                        </p>

                        <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                        <p className="text-lg mb-6">
                            At LearnHive, we envision a world where education is flexible, scalable, and accessible to all. We strive to offer a
                            platform that fosters growth, collaboration, and a love for learning through technology.
                        </p>

                        {/* <button
                            className="bg-yellow-500 text-black px-6 py-3 rounded-full shadow-md font-semibold hover:bg-yellow-600 transition duration-300"
                        >
                            Join Us Today
                        </button> */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
