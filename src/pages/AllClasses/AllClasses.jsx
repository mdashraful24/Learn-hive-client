// import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
// import { Helmet } from "react-helmet-async";
// import { Link } from "react-router-dom";

// const AllClasses = () => {
//     const axiosPublic = useAxiosPublic();

//     // Fetch approved classes
//     const { data: approvedClasses = [], isLoading, isError } = useQuery({
//         queryKey: ["approvedClasses"],
//         queryFn: async () => {
//             const res = await axiosPublic.get("/all-classes"); // Updated endpoint
//             return res.data;
//         },
//     });

//     if (isLoading) {
//         <div className="flex min-h-screen justify-center items-center">
//             <span className="loading loading-bars loading-lg"></span>
//         </div>
//     }

//     if (isError) {
//         return <div className="flex justify-center items-center mt-10 text-red-600 min-h-screen">Failed to load classes.</div>;
//     }

//     return (
//         <div className="mt-10 mb-20 px-5 lg:px-10">
//             <Helmet>
//                 <title>All Classes | LearnHive</title>
//             </Helmet>
//             <h2 className="text-3xl font-bold text-center mb-10">All Approved Classes</h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {approvedClasses.map((classItem) => (
//                     <div
//                         key={classItem._id}
//                         className="bg-white shadow-md rounded-lg overflow-hidden border hover:shadow-lg transition flex flex-col"
//                     >
//                         <img
//                             src={classItem.image}
//                             alt={classItem.title}
//                             className="w-full h-60 object-cover"
//                         />
//                         <div className="p-5 flex flex-col flex-grow">
//                             <h3 className="text-xl font-bold mb-2">{classItem.title}</h3>
//                             <p className="text-gray-600 text-sm mb-2">
//                                 <span className="font-medium">Posted by:</span> {classItem.name}
//                             </p>
//                             <p className="text-gray-700 text-sm mb-3">
//                                 {classItem.description.length > 100
//                                     ? `${classItem.description.slice(0, 100)}...`
//                                     : classItem.description}
//                             </p>
//                             <p className="text-green-600 font-bold mb-2">Price: ${classItem.price}</p>
//                             <p className="text-blue-600 mb-4">
//                                 Total Enrollments: {classItem.totalEnrolment}
//                             </p>
//                             <div className="mt-auto">
//                                 <Link to={`/details/${classItem._id}`}>
//                                     <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
//                                         Enroll
//                                     </button>
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default AllClasses;






// Updated code
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState } from "react";

const AllClasses = () => {
    const axiosPublic = useAxiosPublic();
    const [currentPage, setCurrentPage] = useState(1); // State for current page
    const classesPerPage = 6; // Number of classes per page

    // Fetch approved classes with pagination
    const { data: approvedClasses = [], isLoading, isError } = useQuery({
        queryKey: ["approvedClasses", currentPage],
        queryFn: async () => {
            const res = await axiosPublic.get(`/all-classes?page=${currentPage}&limit=${classesPerPage}`);
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="flex min-h-screen justify-center items-center">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        );
    }

    if (isError) {
        return <div className="flex justify-center items-center mt-10 text-red-600 min-h-screen">Failed to load classes.</div>;
    }

    // Calculate total pages based on total classes and classes per page
    const totalPages = Math.ceil(approvedClasses.totalClasses / classesPerPage);

    return (
        <div className="mt-10 mb-20 px-5 lg:px-10">
            <Helmet>
                <title>All Classes | LearnHive</title>
            </Helmet>
            <h2 className="text-3xl font-bold text-center mb-10">All Approved Classes</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {approvedClasses.classes.map((classItem) => (
                    <div
                        key={classItem._id}
                        className="bg-white shadow-md rounded-lg overflow-hidden border hover:shadow-lg transition flex flex-col"
                    >
                        <img
                            src={classItem.image}
                            alt={classItem.title}
                            className="w-full h-60 object-cover"
                        />
                        <div className="p-5 flex flex-col flex-grow">
                            <h3 className="text-xl font-bold mb-2">{classItem.title}</h3>
                            <p className="text-gray-600 text-sm mb-2">
                                <span className="font-medium">Posted by:</span> {classItem.name}
                            </p>
                            <p className="text-gray-700 text-sm mb-3">
                                {classItem.description.length > 100
                                    ? `${classItem.description.slice(0, 100)}...`
                                    : classItem.description}
                            </p>
                            <p className="text-green-600 font-bold mb-2">Price: ${classItem.price}</p>
                            <p className="text-blue-600 mb-4">
                                Total Enrollments: {classItem.totalEnrolment}
                            </p>
                            <div className="mt-auto">
                                <Link to={`/details/${classItem._id}`}>
                                    <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                                        Enroll
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-10">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 mx-1 bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-100"
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 mx-1 bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-100"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllClasses;
