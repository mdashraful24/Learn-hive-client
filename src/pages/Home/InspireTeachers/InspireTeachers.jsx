import inspire from '../../../assets/home/inspire.jpg'

const InspireTeachers = () => {
    return (
        <div className="mb-20 rounded-xl border p-5 md:p-8 lg:p-12 ">
            <h2 className="text-center text-4xl font-extrabold mb-6">Become a Teacher at LearnHive</h2>
            <p className="text-center text-lg mb-10">
                Join our platform and help students achieve their learning goals. With LearnHive, you get the flexibility to teach the skills you’re passionate about, from anywhere in the world.
            </p>
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-10">
                <div className="flex justify-center items-center">
                    <img
                        src={inspire}
                        alt="Teach on LearnHive"
                        className="rounded-lg shadow-lg"
                    />
                </div>
                <div className="flex flex-col justify-center">
                    <h3 className="text-2xl font-semibold mb-4">Why Teach with Us?</h3>
                    <ul className="list-disc list-inside space-y-4 md:text-lg">
                        <li className="">Flexible scheduling and the ability to teach from anywhere.</li>
                        <li className="">Reach a global audience of motivated students.</li>
                        <li className="">Use a user-friendly platform to deliver your lessons.</li>
                        <li className="">Get paid for your expertise and efforts.</li>
                    </ul>
                    <a
                        href="/tech"
                        className="btn btn-neutral hover:bg-black mt-6 text-white rounded-full md: md:text-xl text-center font-semibold"
                    >
                        Become a Teacher
                    </a>
                </div>
            </div>
        </div>
    );
};

export default InspireTeachers;