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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {classesData.classes.map((classItem) => (
                        <div key={classItem._id} className="rounded-xl shadow-lg overflow-hidden flex flex-col h-full group">
                            {/* Image */}
                            <img
                                src={classItem.image || "/path/to/default-image.jpg"}
                                alt={classItem.title}
                                className="w-full h-60 object-cover transition duration-500 group-hover:scale-105"
                            />

                            {/* Card Content (Title, Description, Button) */}
                            <div className="flex flex-col flex-grow px-4 py-6">
                                <h3 className="text-lg font-bold">{classItem.title}</h3>
                                <p className="text-sm mt-2 flex-grow">{classItem.description || "No description available."}</p>

                                {/* Button Wrapper to Keep Alignment */}
                                <div className="flex justify-between items-center mt-5">
                                    {/* Price */}
                                    <p className="text-xl font-semibold">
                                        <span>$</span>
                                        <span className="text-blue-600 ml-1">
                                            {classItem.price}
                                        </span>
                                    </p>

                                    {/* Button */}
                                    <Link
                                        to={`/details/${classItem._id}`}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition duration-300 shadow-sm hover:shadow-md"
                                    >
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
