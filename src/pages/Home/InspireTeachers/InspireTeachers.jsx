import { Fade } from 'react-awesome-reveal';
import inspire from '../../../assets/home/inspire.jpg'

const InspireTeachers = () => {
    return (
        <div className="mb-20 md:mb-28 p-12 px-2 md:px-3 lg:px-2.5 bg-base-200">
            <h2 className="text-2xl md:text-4xl text-center font-extrabold mb-5">Become a Teacher at LearnHive</h2>
            <p className="md:max-w-2xl lg:max-w-4xl md:text-lg mx-auto text-center  mb-14">
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
                <div className="flex flex-col justify-center overflow-hidden">
                    <div className='px-5'>
                        <Fade direction="right" triggerOnce>
                            <h3 className="text-xl font-semibold mb-4">Why Teach with Us?</h3>
                        </Fade>
                        <Fade cascade direction="right" triggerOnce>
                            <ul className="list-disc list-inside space-y-4 md:text-lg">
                                <li className="">Flexible scheduling and the ability to teach from anywhere.</li>
                                <li className="">Reach a global audience of motivated students.</li>
                                <li className="">Use a user-friendly platform to deliver your lessons.</li>
                                <li className="">Get paid for your expertise and efforts.</li>
                            </ul>
                        </Fade>
                    </div>
                    <a
                        href="/tech"
                        className="btn bg-blue-600 hover:bg-blue-700 mt-6 md:mt-8 text-white rounded-full md:text-xl text-center font-semibold"
                    >
                        Become a Teacher
                    </a>
                </div>
                {/* <div className="flex flex-col justify-center">
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
                </div> */}
            </div>
        </div>
    );
};

export default InspireTeachers;