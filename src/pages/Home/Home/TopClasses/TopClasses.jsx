import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const TopClasses = () => {
    const axiosPublic = useAxiosPublic();

    const { data: classesData, isLoading, isError } = useQuery({
        queryKey: ["sixClasses"],
        queryFn: async () => {
            const res = await axiosPublic.get("/all-classes?limit=6");
            return res.data;
        },
    });

    if (isError) {
        return <div className="text-lg text-center mb-16">Error loading classes</div>;
    }

    return (
        <div className="container mx-auto mb-20 px-2.5">
            <div className="mb-10">
                <h2 className="text-2xl md:text-4xl text-center font-extrabold mb-5">Currently Popular Classes</h2>
                <p className="md:text-lg text-center lg:w-1/2 mx-auto">
                    Explore a range of skills to build and enhance your knowledge in modern technologies and creative fields.
                </p>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center w-full h-72">
                    <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : Array.isArray(classesData?.classes) && classesData.classes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {classesData.classes.map((classItem) => (
                        <div key={classItem._id} className="rounded-xl shadow-lg md:border overflow-hidden p-3 md:p-5">
                            <div className="rounded-xl overflow-hidden mb-5">
                                {/* Image */}
                                <img
                                    src={classItem.image || "/path/to/default-image.jpg"}
                                    alt={classItem.title}
                                    className="w-full h-64"
                                />
                            </div>

                            {/* Card Content */}
                            <div className="">
                                <h3 className="text-lg font-bold text-gray-900">{classItem.title}</h3>
                                <p className="text-sm text-gray-600 mt-2 line-clamp-3">{classItem.description || "No description available."}</p>

                                {/* "See More" Button */}
                                <Link to={`/details/${classItem._id}`} className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition duration-300 hover:bg-blue-700">
                                    See More
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">No classes available</div>
            )}
        </div>
    );
};

export default TopClasses;
