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
        <div className="container mx-auto mb-20 md:mb-28 px-2 md:px-3 lg:px-2.5">
            <div className="mb-10">
                <h2 className="text-2xl md:text-4xl text-center font-extrabold mb-5">Currently Popular Classes</h2>
                <p className="md:text-lg text-center mb-12">
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
                        <div key={classItem._id} className="rounded-xl shadow-lg md:border overflow-hidden p-3 md:p-5 flex flex-col h-full">
                            <div className="rounded-xl overflow-hidden mb-5">
                                {/* Image */}
                                <img
                                    src={classItem.image || "/path/to/default-image.jpg"}
                                    alt={classItem.title}
                                    className="w-full h-64"
                                />
                            </div>

                            {/* Card Content (Title, Description, Button) */}
                            <div className="flex flex-col flex-grow">
                                <h3 className="text-lg md:text-xl font-bold">{classItem.title}</h3>
                                <p className="text-sm md:text-base mt-2 flex-grow">{classItem.description || "No description available."}</p>

                                {/* Button Wrapper to Keep Alignment */}
                                <div className="mt-10">
                                    <Link to={`/details/${classItem._id}`} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 self-start">
                                        See More
                                    </Link>
                                </div>
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
