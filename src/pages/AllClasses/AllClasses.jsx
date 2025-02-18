import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState } from "react";

const AllClasses = () => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);

    const axiosPublic = useAxiosPublic();
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState("");
    const classesPerPage = 9;

    const { data: approvedClasses = [], isLoading, isError } = useQuery({
        queryKey: ["approvedClasses", currentPage, sortOrder],
        queryFn: async () => {
            let url = `/all-classes?page=${currentPage}&limit=${classesPerPage}`;
            if (sortOrder) {
                url += `&sort=${sortOrder}`;
            }
            const res = await axiosPublic.get(url);
            return res.data;
        },
    });

    if (isError) {
        return (
            <div className="flex justify-center items-center mt-10 text-lg text-black font-bold min-h-screen">
                Failed to load classes. Please try again later.
            </div>
        );
    }

    const totalPages = Math.ceil(approvedClasses.totalClasses / classesPerPage);

    return (
        <div className="container mx-auto mt-7 md:mt-10 mb-16 px-2.5">
            <Helmet>
                <title>All Classes | LearnHive</title>
            </Helmet>
            <h2 className="text-2xl md:text-4xl font-extrabold text-center mb-7 md:mb-10">All Approved Classes</h2>

            <div className="flex justify-end items-center gap-2 font-medium mb-6">
                <label>Sort by Price:</label>
                <select
                    className="border px-3 py-1.5 rounded border-black"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option className="font-medium" value="">Default</option>
                    <option className="font-medium" value="asc">Low to High</option>
                    <option className="font-medium" value="desc">High to Low</option>
                </select>
            </div>

            {isLoading ? (
                <div className="min-h-96 flex justify-center items-center my-10">
                    <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                approvedClasses.classes.length === 0 ? (
                    <div className="flex justify-center items-center mt-10 text-lg text-gray-700 font-medium min-h-screen">
                        No classes are available at the moment. Please check back later!
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {approvedClasses.classes.map((classItem) => (
                            <div
                                key={classItem._id}
                                className="bg-white shadow-md rounded-xl overflow-hidden border hover:shadow-lg transition flex flex-col"
                            >
                                <img
                                    src={classItem.image}
                                    alt={classItem.title}
                                    className="w-full h-60 lg:object-cover transform hover:scale-105 transition duration-500 ease-in-out"
                                />
                                <div className="p-5 flex flex-col flex-grow">
                                    <h3 className="text-lg md:text-xl font-bold mb-2">{classItem.title}</h3>
                                    <p className="text-gray-600 text-sm mb-2">
                                        <span className="font-medium">Posted by:</span> {classItem.name}
                                    </p>
                                    <p className="text-gray-700 text-sm mb-3">
                                        {classItem.description.length > 100
                                            ? `${classItem.description.slice(0, 100)}...`
                                            : classItem.description}
                                    </p>
                                    <p className="text-green-600 font-bold mb-2">Price: ${classItem.price}</p>
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
                )
            )}

            <div className="mt-10 flex flex-col md:flex-row justify-center md:justify-between items-center gap-3">
                <div>
                    <span className="text-gray-800">Page {currentPage} of {totalPages}</span>
                </div>

                <div>
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 mx-1 bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-100"
                    >
                        Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`px-3 py-1 mx-1 ${currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 mx-1 bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-100"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllClasses;











// import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
// import { Helmet } from "react-helmet-async";
// import { Link } from "react-router-dom";
// import { useState } from "react";

// const AllClasses = () => {
//     // Scroll to the top when the component mounts
//     window.scrollTo(0, 0);

//     const axiosPublic = useAxiosPublic();
//     const [currentPage, setCurrentPage] = useState(1);
//     const [sortOrder, setSortOrder] = useState(""); // No sorting by default
//     const classesPerPage = 9;

//     // Fetch approved classes with pagination and optional sorting
//     const { data: approvedClasses = [], isLoading, isError } = useQuery({
//         queryKey: ["approvedClasses", currentPage, sortOrder],
//         queryFn: async () => {
//             let url = `/all-classes?page=${currentPage}&limit=${classesPerPage}`;
//             if (sortOrder) {
//                 url += `&sort=${sortOrder}`;
//             }
//             const res = await axiosPublic.get(url);
//             return res.data;
//         },
//     });

//     if (isLoading) {
//         return (
//             <div className="flex min-h-screen justify-center items-center">
//                 {/* <span className="loading loading-bars loading-lg"></span> */}
//                 <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
//             </div>
//         );
//     }

//     if (isError) {
//         return (
//             <div className="flex justify-center items-center mt-10 text-lg text-black font-bold min-h-screen">
//                 Failed to load classes. Please try again later.
//             </div>
//         );
//     }

//     // Check if no classes are available
//     if (approvedClasses.classes.length === 0) {
//         return (
//             <div className="flex justify-center items-center mt-10 text-lg text-gray-700 font-medium min-h-screen">
//                 No classes are available at the moment. Please check back later!
//             </div>
//         );
//     }

//     // Calculate total pages based on total classes and classes per page
//     const totalPages = Math.ceil(approvedClasses.totalClasses / classesPerPage);

//     return (
//         <div className="container mx-auto mt-7 md:mt-10 mb-24 px-2.5">
//             <Helmet>
//                 <title>All Classes | LearnHive</title>
//             </Helmet>
//             <h2 className="text-2xl md:text-4xl font-extrabold text-center mb-7 md:mb-10">All Approved Classes</h2>

//             {/* Sorting Dropdown */}
//             <div className="flex justify-end items-center gap-2 font-medium mb-6">
//                 <label>Sort by Price:</label>
//                 <select
//                     className="border px-3 py-1.5 rounded border-black bg-white"
//                     value={sortOrder}
//                     onChange={(e) => setSortOrder(e.target.value)}
//                 >
//                     <option value="">Default</option>
//                     <option value="asc">Low to High</option>
//                     <option value="desc">High to Low</option>
//                 </select>
//             </div>

//             {/* Classes Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {approvedClasses.classes.map((classItem) => (
//                     <div
//                         key={classItem._id}
//                         className="bg-white shadow-md rounded-xl overflow-hidden border hover:shadow-lg transition flex flex-col"
//                     >
//                         <img
//                             src={classItem.image}
//                             alt={classItem.title}
//                             className="w-full h-60 lg:object-cover transform hover:scale-105 transition duration-500 ease-in-out"
//                         />
//                         <div className="p-5 flex flex-col flex-grow">
//                             <h3 className="text-lg md:text-xl font-bold mb-2">{classItem.title}</h3>
//                             <p className="text-gray-600 text-sm mb-2">
//                                 <span className="font-medium">Posted by:</span> {classItem.name}
//                             </p>
//                             <p className="text-gray-700 text-sm mb-3">
//                                 {classItem.description.length > 100
//                                     ? `${classItem.description.slice(0, 100)}...`
//                                     : classItem.description}
//                             </p>
//                             <p className="text-green-600 font-bold mb-2">Price: ${classItem.price}</p>
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

//             {/* Pagination Controls */}
//             <div className="mt-10 flex flex-col md:flex-row justify-center md:justify-between items-center gap-3">
//                 <div>
//                     <span className="text-gray-800">Page {currentPage} of {totalPages}</span>
//                 </div>

//                 <div>
//                     <button
//                         onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                         disabled={currentPage === 1}
//                         className="px-3 py-1 mx-1 bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-100"
//                     >
//                         Prev
//                     </button>
//                     {Array.from({ length: totalPages }, (_, index) => (
//                         <button
//                             key={index}
//                             onClick={() => setCurrentPage(index + 1)}
//                             className={`px-3 py-1 mx-1 ${currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
//                         >
//                             {index + 1}
//                         </button>
//                     ))}
//                     <button
//                         onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                         disabled={currentPage === totalPages}
//                         className="px-3 py-1 mx-1 bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-100"
//                     >
//                         Next
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AllClasses;








// Submitted code
// import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
// import { Helmet } from "react-helmet-async";
// import { Link } from "react-router-dom";
// import { useState } from "react";

// const AllClasses = () => {
//     // Scroll to the top when the component mounts
//     window.scrollTo(0, 0);
    
//     const axiosPublic = useAxiosPublic();
//     const [currentPage, setCurrentPage] = useState(1);
//     const classesPerPage = 9;

//     // Fetch approved classes with pagination
//     const { data: approvedClasses = [], isLoading, isError } = useQuery({
//         queryKey: ["approvedClasses", currentPage],
//         queryFn: async () => {
//             const res = await axiosPublic.get(`/all-classes?page=${currentPage}&limit=${classesPerPage}`);
//             return res.data;
//         },
//     });

//     if (isLoading) {
//         return (
//             <div className="flex min-h-screen justify-center items-center">
//                 <span className="loading loading-bars loading-lg"></span>
//             </div>
//         );
//     }

//     if (isError) {
//         return (
//             <div className="flex justify-center items-center mt-10 text-lg text-black font-bold min-h-screen">
//                 Failed to load classes. Please try again later.
//             </div>
//         );
//     }

//     // Check if no classes are available
//     if (approvedClasses.classes.length === 0) {
//         return (
//             <div className="flex justify-center items-center mt-10 text-lg text-gray-700 font-medium min-h-screen">
//                 No classes are available at the moment. Please check back later!
//             </div>
//         );
//     }

//     // Calculate total pages based on total classes and classes per page
//     const totalPages = Math.ceil(approvedClasses.totalClasses / classesPerPage);

//     return (
//         <div className="container mx-auto mt-7 md:mt-10 mb-20 px-2.5">
//             <Helmet>
//                 <title>All Classes | LearnHive</title>
//             </Helmet>
//             <h2 className="text-2xl md:text-4xl font-extrabold text-center mb-7 md:mb-10">All Approved Classes</h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {approvedClasses.classes.map((classItem) => (
//                     <div
//                         key={classItem._id}
//                         className="bg-white shadow-md rounded-lg overflow-hidden border hover:shadow-lg transition flex flex-col"
//                     >
//                         <img
//                             src={classItem.image}
//                             alt={classItem.title}
//                             className="w-full h-60 lg:object-cover"
//                         />
//                         <div className="p-5 flex flex-col flex-grow">
//                             <h3 className="text-lg md:text-xl font-bold mb-2">{classItem.title}</h3>
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

//             {/* Pagination Controls */}
//             <div className="mt-10 flex flex-col md:flex-row justify-center md:justify-between items-center gap-3">
//                 <div>
//                     <span className="text-gray-800">Page {currentPage} of {totalPages}</span>
//                 </div>

//                 <div>
//                     <button
//                         onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                         disabled={currentPage === 1}
//                         className="px-3 py-1 mx-1 bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-100"
//                     >
//                         Prev
//                     </button>
//                     {Array.from({ length: totalPages }, (_, index) => (
//                         <button
//                             key={index}
//                             onClick={() => setCurrentPage(index + 1)}
//                             className={`px-3 py-1 mx-1 ${currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
//                         >
//                             {index + 1}
//                         </button>
//                     ))}
//                     <button
//                         onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                         disabled={currentPage === totalPages}
//                         className="px-3 py-1 mx-1 bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-100"
//                     >
//                         Next
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AllClasses;




// reserve code
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



