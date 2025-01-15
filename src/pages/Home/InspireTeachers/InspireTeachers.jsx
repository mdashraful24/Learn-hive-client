import inspire from '../../../assets/home/inspire.jpg'

const InspireTeachers = () => {
    return (
        <div className="mb-20 p-12 rounded-xl shadow-xl border">
            <h2 className="text-center text-4xl font-extrabold mb-6">Become a Teacher at LearnHive</h2>
            <p className="text-center text-lg mb-10">
                Join our platform and help students achieve their learning goals. With LearnHive, you get the flexibility to teach the skills you’re passionate about, from anywhere in the world.
            </p>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex justify-center items-center">
                    <img
                        src={inspire}
                        alt="Teach on LearnHive"
                        className="rounded-lg shadow-lg"
                    />
                </div>
                <div className="flex flex-col justify-center">
                    <h3 className="text-2xl font-semibold mb-4">Why Teach with Us?</h3>
                    <ul className="list-disc list-inside space-y-4">
                        <li className="text-lg">Flexible scheduling and the ability to teach from anywhere.</li>
                        <li className="text-lg">Reach a global audience of motivated students.</li>
                        <li className="text-lg">Use a user-friendly platform to deliver your lessons.</li>
                        <li className="text-lg">Get paid for your expertise and efforts.</li>
                    </ul>
                    <a
                        href="/"
                        className="mt-6 inline-block py-3 px-6 bg-gradient-to-r from-[#F97316] to-[#F59E0B] text-white rounded-full text-xl text-center font-semibold transition-all duration-300 hover:bg-gradient-to-l hover:from-[#F97316] hover:to-[#F59E0B]"
                    >
                        Apply Now
                    </a>
                </div>
            </div>
        </div>
    );
};

export default InspireTeachers;