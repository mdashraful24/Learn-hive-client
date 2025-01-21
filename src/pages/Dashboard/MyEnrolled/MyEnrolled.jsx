
// Without pagination
// import React from "react";
// import useAuth from "../../../hooks/useAuth";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";
// import { useQuery } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";

// const MyEnrolled = () => {
//     const { user } = useAuth();
//     const axiosPublic = useAxiosPublic();
//     const navigate = useNavigate();

//     // Fetch enrolled classes
//     const { data: approvedClasses = [], isLoading, isError } = useQuery({
//         queryKey: ["approvedClasses"],
//         queryFn: async () => {
//             const res = await axiosPublic.get(`/payments/${user.email}`);
//             return res.data;
//         },
//     });

//     if (isLoading) {
//         return <div>Loading...</div>;
//     }

//     if (isError) {
//         return <div>Error: {isError.message}</div>;
//     }

//     if (approvedClasses.length === 0) {
//         return (
//             <div className="text-center mt-10">
//                 <p className="text-lg font-semibold text-gray-600">
//                     No enrolled classes found. Please explore our courses and start learning!
//                 </p>
//             </div>
//         );
//     }

//     const handleEnrollDetails = (course) => {
//         // Navigate to the enrolled class page and pass the course ID via state
//         navigate(`/dashboard/myEnroll-class/${course._id}`);
//     };

//     return (
//         <div className="mt-10">
//             <h2 className="text-2xl md:text-3xl font-bold text-center mb-5">My Enrolled Classes</h2>
//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
//                 {approvedClasses.map((course) => (
//                     <div key={course._id} className="bg-white shadow-md rounded-md p-4">
//                         <img
//                             className="w-full h-48 object-cover rounded-md"
//                             src={course.image}
//                             alt={course.title}
//                         />
//                         <h3 className="text-xl font-bold mt-4">{course.title}</h3>
//                         <p className="text-gray-600">Posted By: {course.name}</p>
//                         <button
//                             onClick={() => handleEnrollDetails(course)}
//                             className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//                         >
//                             Continue
//                         </button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default MyEnrolled;






import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Helmet } from "react-helmet-async";

const MyEnrolled = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    // Fetch enrolled classes
    const { data: approvedClasses = [], isLoading, isError } = useQuery({
        queryKey: ["approvedClasses"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/payments/${user.email}`);
            return res.data;
        },
    });

    if (isLoading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    if (isError) {
        return <div className="text-center mt-10">Error: {isError.message}</div>;
    }

    if (approvedClasses.length === 0) {
        return (
            <div className="text-center mt-10">
                <p className="text-lg font-semibold text-gray-600">
                    No enrolled classes found. Please explore our courses and start learning!
                </p>
            </div>
        );
    }

    const handleEnrollDetails = (course) => {
        navigate(`/dashboard/myEnroll-class/${course._id}`);
    };

    const paginatedClasses = approvedClasses.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    // Handle page change
    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    return (
        <div className="mt-10 lg:mt-5 mb-16">
            <Helmet>
                <title>My Enrolled Classes | LearnHive</title>
            </Helmet>

            {/* title */}
            <h2 className="text-3xl font-bold text-center mb-5">My Enrolled Classes</h2>

            {/* enroll classes cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {paginatedClasses.map((course) => (
                    <div key={course._id} className="bg-white shadow-md rounded-md p-4">
                        <img
                            className="w-full h-48 object-cover rounded-md"
                            src={course.image}
                            alt={course.title}
                        />
                        <h3 className="text-xl font-bold mt-4">{course.title}</h3>
                        <p className="text-gray-600 mt-2"><strong>Posted By:</strong> {course.name}</p>
                        <p className="text-gray-600 mt-2">
                            <span><strong>Enroll Date:</strong></span> {course.date ? new Date(course.date).toLocaleDateString() : "N/A"}
                        </p>
                        <button
                            onClick={() => handleEnrollDetails(course)}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Continue
                        </button>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <ReactPaginate
                previousLabel={
                    <button className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-l-lg">
                        Previous
                    </button>
                }
                nextLabel={
                    <button className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-r-lg">
                        Next
                    </button>
                }
                pageCount={Math.ceil(approvedClasses.length / itemsPerPage)}
                onPageChange={handlePageChange}
                containerClassName={"flex justify-center items-center mt-8 space-x-2"}
                pageClassName={"px-4 py-2 mx-1 border cursor-pointer rounded-lg"}
                activeClassName={"bg-blue-600 text-white"}
                disabledClassName={"cursor-not-allowed"}
                pageLinkClassName="block text-center"
                previousLinkClassName="block text-center"
                nextLinkClassName="block text-center"
            />
        </div>
    );
};

export default MyEnrolled;
