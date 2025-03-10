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
                <p className="text-lg font-semibold">
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
        <div className="mt-6 mb-16">
            <Helmet>
                <title>My Enrolled Classes | LearnHive</title>
            </Helmet>

            {/* title */}
            <h2 className="text-2xl md:text-4xl font-extrabold text-center mb-10">My Enrolled Classes</h2>

            {/* enroll classes cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {paginatedClasses.map((course) => (
                    <div key={course._id} className="shadow-md rounded-lg p-4 border">
                        <img
                            className="w-full h-48 md:object-cover rounded-md"
                            src={course.image}
                            alt={course.title}
                        />
                        <h3 className="text-xl font-bold mt-4">{course.title}</h3>
                        <p className="mt-2"><strong>Posted By:</strong> {course.name}</p>
                        <p className="mt-2">
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
            <div className="mt-10 flex flex-col md:flex-row justify-center md:justify-between items-center gap-3">
                <div>
                    <span className="">Page {currentPage + 1} of {Math.ceil(approvedClasses.length / itemsPerPage)}</span>
                </div>
                <div>
                    <ReactPaginate
                        previousLabel={
                            <button className="px-2 py-1 bg-base-300 hover:bg-base-300 rounded-l-lg">
                                Prev
                            </button>
                        }
                        nextLabel={
                            <button className="px-2 py-1 bg-base-300 hover:bg-base-300 rounded-r-lg">
                                Next
                            </button>
                        }
                        pageCount={Math.ceil(approvedClasses.length / itemsPerPage)}
                        onPageChange={handlePageChange}
                        containerClassName={"flex justify-center items-center space-x-2"}
                        pageClassName={"px-3 py-1 mx-1 border cursor-pointer"}
                        activeClassName={"bg-blue-600 text-white"}
                        disabledClassName={"cursor-not-allowed"}
                        pageLinkClassName="block text-center"
                        previousLinkClassName="block text-center"
                        nextLinkClassName="block text-center"
                    />
                </div>
            </div>
        </div>
    );
};

export default MyEnrolled;
