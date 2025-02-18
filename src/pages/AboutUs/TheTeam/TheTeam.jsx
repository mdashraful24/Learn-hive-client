import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const teamMembers = [
    {
        name: "John Doe",
        role: "CEO & Founder",
        img: "https://randomuser.me/api/portraits/men/1.jpg",
        bio: "John is passionate about revolutionizing education through technology.",
    },
    {
        name: "Jane Smith",
        role: "CTO & Co-Founder",
        img: "https://randomuser.me/api/portraits/women/1.jpg",
        bio: "Jane leads the development team with innovative solutions and ideas.",
    },
    {
        name: "Alice Johnson",
        role: "Head of Product",
        img: "https://randomuser.me/api/portraits/women/2.jpg",
        bio: "Alice ensures our platform meets the needs of users and the market.",
    },
];

const TheTeam = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <div className="bg-base-200 mb-20 md:mb-28 pt-10 pb-14">
            <div className="px-2.5">
                <h2 className="text-2xl md:text-4xl font-extrabold text-center mb-4">Meet Our Team</h2>
                <div className="w-28 mx-auto border-b-4 border-blue-700 mb-8"></div>
                <div className="flex flex-col lg:flex-row flex-wrap justify-center gap-8">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="w-full lg:w-1/3 p-6 border rounded-xl shadow-md hover:shadow-xl"
                            data-aos="fade-up"
                            data-aos-delay={index * 300}
                        >
                            <div className="flex flex-col items-center text-center">
                                <img
                                    src={member.img}
                                    alt={member.name}
                                    className="w-32 h-32 rounded-full mb-4 shadow-lg"
                                />
                                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                                <p className="mb-4">{member.role}</p>
                                <p>{member.bio}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TheTeam;
