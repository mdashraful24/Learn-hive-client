import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const AllClasses = () => {
    window.scrollTo(0, 0);

    const axiosPublic = useAxiosPublic();
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState("");
    const classesPerPage = 20;

    const { data: approvedClasses = {}, isLoading, isError } = useQuery({
        queryKey: ["approvedClasses", currentPage, sortOrder],
        queryFn: async () => {
            let url = `/all-classes?page=${currentPage}&limit=${classesPerPage}`;
            if (sortOrder) url += `&sort=${sortOrder}`;
            const res = await axiosPublic.get(url);
            return res.data;
        },
    });

    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
                Failed to load classes. Please try again later.
            </div>
        );
    }

    const totalPages = Math.ceil(
        (approvedClasses.totalClasses || 0) / classesPerPage
    );

    return (
        <div className="container mx-auto min-h-screen mt-7 md:mt-10 mb-16 px-2 md:px-3 lg:px-2.5">
            <Helmet>
                <title>All Classes | LearnHive</title>
            </Helmet>

            {/* Hero */}
            <div className="max-w-6xl mx-auto mb-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-5">
                    Explore Our Approved Classes 📚
                </h2>
                <p>
                    Upgrade your skills with expert-led courses
                </p>
            </div>

            <div>
                {/* Sort */}
                <div className="flex justify-end items-center mb-8">
                    <div className="relative w-40">
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
                            value={sortOrder}
                            onChange={(e) => {
                                setCurrentPage(1);
                                setSortOrder(e.target.value);
                            }}
                        >
                            <option value="">Sort by Price</option>
                            <option value="asc">Low to High</option>
                            <option value="desc">High to Low</option>
                        </select>
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                        />
                    </div>
                </div>

                {/* Loading */}
                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : approvedClasses.classes?.length === 0 ? (
                    <div className="text-center py-20">
                        No classes available at the moment.
                    </div>
                ) : (
                    <>
                        {/* Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                            {approvedClasses.classes?.map((classItem) => (
                                <div
                                    key={classItem._id}
                                    className="rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col group"
                                >
                                    <div className="overflow-hidden">
                                        <img
                                            src={classItem.image}
                                            alt={classItem.title}
                                            className="w-full h-56 object-cover transition duration-500 group-hover:scale-105"
                                        />
                                    </div>

                                    <div className="px-4 py-6 flex flex-col flex-grow">
                                        <h3 className="text-lg font-bold mb-2">
                                            {classItem.title}
                                        </h3>

                                        <p className="text-sm mb-3">
                                            By {classItem.name}
                                        </p>

                                        <p className="text-sm mb-4 flex-grow">
                                            {classItem.description.length > 110
                                                ? `${classItem.description.slice(0, 110)}...`
                                                : classItem.description}
                                        </p>

                                        <div className="flex justify-between items-center mt-auto">
                                            <p className="text-xl font-semibold">
                                                <span>$</span>
                                                <span className="text-blue-600 ml-1">
                                                    {classItem.price}
                                                </span>
                                            </p>

                                            <Link to={`/details/${classItem._id}`}>
                                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition">
                                                    Enroll
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-4">
                            <span className="text-gray-600">
                                Page {currentPage} of {totalPages}
                            </span>

                            <div className="flex flex-wrap justify-center gap-2">
                                <button
                                    onClick={() =>
                                        setCurrentPage((prev) =>
                                            Math.max(prev - 1, 1)
                                        )
                                    }
                                    disabled={currentPage === 1}
                                    className="px-3 py-1.5 bg-white border rounded-lg hover:bg-gray-100 disabled:opacity-50"
                                >
                                    Prev
                                </button>

                                {Array.from(
                                    { length: totalPages },
                                    (_, index) => (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                setCurrentPage(index + 1)
                                            }
                                            className={`px-4 py-1.5 rounded-lg border ${currentPage === index + 1
                                                    ? "bg-blue-600 text-white border-blue-600"
                                                    : "bg-white hover:bg-gray-100"
                                                }`}
                                        >
                                            {index + 1}
                                        </button>
                                    )
                                )}

                                <button
                                    onClick={() =>
                                        setCurrentPage((prev) =>
                                            Math.min(prev + 1, totalPages)
                                        )
                                    }
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-1.5 bg-white border rounded-lg hover:bg-gray-100 disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </>
                )}
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
//         <div className="container mx-auto mt-7 md:mt-10 mb-24 px-2 md:px-3 lg:px-2.5">
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
//         <div className="container mx-auto mt-7 md:mt-10 mb-20 px-2 md:px-3 lg:px-2.5">
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



