import React from "react";
import { Parallax } from "react-parallax";
import { useQuery } from "@tanstack/react-query";
import { FaChalkboardTeacher, FaUserGraduate, FaUsers, FaChartLine, FaAward, FaGlobe } from "react-icons/fa";
import features from "../../../assets/home/image.jpg";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const icons = {
    FaChalkboardTeacher: <FaChalkboardTeacher size={64} />,
    FaUserGraduate: <FaUserGraduate size={64} />,
    FaUsers: <FaUsers size={64} />,
    FaChartLine: <FaChartLine size={64} />,
    FaAward: <FaAward size={64} />,
    FaGlobe: <FaGlobe size={64} />
};

const KeyFeatures = () => {
    const axiosPublic = useAxiosPublic();

    const { data: featuresData = [], isLoading, isError } = useQuery({
        queryKey: ["features"],
        queryFn: async () => {
            const response = await axiosPublic.get("/features");
            return response.data;
        }
    });

    return (
        <Parallax
            className="mb-20 md:mb-28"
            bgImage={features}
            strength={300}
            bgImageAlt="Key Features Background"
        >
            <div className="bg-black bg-opacity-60 py-12">
                <div className="text-center">
                    <div className="text-white px-3 md:px-5 lg:px-0">
                        <h2 className="text-2xl md:text-4xl font-extrabold mb-5">Key Features</h2>
                        <p className="lg:w-1/2 md:text-lg mx-auto mb-12">
                            Discover the powerful features that make LearnHive a leading platform for online education. We offer tools and resources to help you learn and grow.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8 px-2 md:px-3 lg:px-2.5">
                        {isLoading ? (
                            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center items-center py-12">
                                {/* <div className="w-12 h-12 border-4 border-gray-200 rounded-full animate-spin"></div> */}
                                <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            featuresData.map((feature) => (
                                <div key={feature._id} className="bg-base-200 bg-opacity-90 p-8 rounded-xl shadow-lg hover:scale-105 transform transition duration-300 ease-in-out">
                                    <div className="flex items-center justify-center mb-6">
                                        {icons[feature.icon] || <FaGlobe size={64} />}
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-semibold mb-4">{feature.title}</h3>
                                    <p className="md:text-lg">{feature.description}</p>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Error Message at Bottom */}
                    {isError && (
                        <div className="text-red-500 text-center py-12 text-lg font-semibold">
                            Oops! Unable to load key features. Please try again later.
                        </div>
                    )}
                </div>
            </div>
        </Parallax>
    );
};

export default KeyFeatures;
