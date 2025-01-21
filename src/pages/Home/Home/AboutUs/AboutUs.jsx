import team from '../../../../assets/home/team.jpg';

const AboutUs = () => {
    return (
        <section className="mb-8 md:mb-10 lg:mb-20">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <h2 className="text-4xl font-extrabold mb-4">About Us</h2>
                <p className="mb-8 md:mb-14 lg:w-2/3 mx-auto">
                    LearnHive is transforming the way education works, offering personalized learning experiences for students and educators alike.
                    Our mission is to empower learners with the skills they need to succeed in the modern world.
                </p>

                {/* Main Content Layout */}
                <div className="flex flex-col lg:flex-row justify-center gap-12">
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
                        <p className="mb-6">
                            We started as a small group of passionate educators who wanted to create a platform that could bridge the gap between
                            traditional learning and modern, interactive online education. Our journey has been fueled by a deep desire to make
                            learning more accessible and engaging for everyone.
                        </p>

                        <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                        <p className="mb-6">
                            At LearnHive, we envision a world where education is flexible, scalable, and accessible to all. We strive to offer a
                            platform that fosters growth, collaboration, and a love for learning through technology.
                        </p>

                        <h3 className="text-2xl font-bold mb-4">Our Values</h3>
                        <p className="mb-6">
                            Integrity, innovation, and inclusivity drive everything we do. We believe in creating an environment where learners
                            and educators feel supported, inspired, and empowered to achieve their goals. By fostering a community built on trust
                            and mutual respect, we aim to revolutionize education for future generations.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
