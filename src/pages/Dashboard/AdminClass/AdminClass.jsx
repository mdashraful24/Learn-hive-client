import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Helmet } from "react-helmet-async";

const AdminClass = () => {
    const axiosSecure = useAxiosSecure();
    const { loading, setLoading } = useAuth();
    const [progressButtonEnabled, setProgressButtonEnabled] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    // Fetch classes
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["adminClasses"],
        queryFn: async () => {
            const res = await axiosSecure.get("/classes");
            return res.data;
        },
    });

    // Filter out rejected classes
    const filteredData = data?.filter((classItem) => classItem.status !== "rejected");

    // pagination
    const paginatedClasses = filteredData?.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    // Handle Approve
    const handleApprove = (classItem) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to approve this class?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, approve it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .patch(`/classes/approve/${classItem._id}`, { status: "accepted" })
                    .then(() => {
                        refetch();
                        setProgressButtonEnabled(true);
                        Swal.fire(
                            "Approved!",
                            "The class has been approved and is now visible on the All Classes page.",
                            "success"
                        );
                    })
                    .catch(() => {
                        Swal.fire({
                            title: "Error!",
                            text: "There was an issue approving the class.",
                            icon: "error",
                        });
                    })
                    .finally(() => setLoading(null));
            } else {
                setLoading(null);
            }
        });
    };

    // Handle Reject
    const handleReject = (classItem) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to reject this class?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, reject it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .patch(`/classes/reject/${classItem._id}`, { status: "rejected" })
                    .then(() => {
                        refetch();
                        setProgressButtonEnabled(false);
                        Swal.fire("Rejected!", "The class has been rejected.", "error");
                    })
                    .catch(() => {
                        Swal.fire({
                            title: "Error!",
                            text: "There was an issue rejecting the class.",
                            icon: "error",
                        });
                    })
                    .finally(() => setLoading(null));
            } else {
                setLoading(null);
            }
        });
    };

    // Handle page change
    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    if (isLoading) {
        return (
            <div className="container mx-auto text-center mt-10">
                <p className="text-gray-500">Loading all classes...</p>
            </div>
        );
    }

    return (
        <div className="mt-5 mb-10">
            <Helmet>
                <title>All Classes | LearnHive</title>
            </Helmet>

            <div>
                {/* Title */}
                <h2 className="text-2xl md:text-4xl font-extrabold text-center mb-6">Admin Classes</h2>

                {/* Table start */}
                <div className="overflow-x-auto rounded-t-xl mt-5">
                    <table className="table min-w-full">
                        {/* Table Head */}
                        <thead>
                            <tr className="bg-blue-600 text-white text-center uppercase">
                                <th className="py-4">#</th>
                                <th className="py-4">Image</th>
                                <th className="py-4">Title</th>
                                <th className="py-4">Description</th>
                                <th className="py-4">Teacher</th>
                                <th className="py-4">Email</th>
                                <th className="py-4">Status</th>
                                <th className="py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedClasses?.map((classItem, index) => (
                                <tr key={classItem._id} className="text-center hover:bg-base-200 border-b border-base-300">
                                    <td className="py-3 font-bold">{index + 1 + currentPage * itemsPerPage}</td>
                                    <td className="py-3">
                                        <img
                                            src={classItem.image}
                                            alt={classItem.title}
                                            className="w-12 h-12 rounded mx-auto"
                                        />
                                    </td>
                                    <td className="py-3">{classItem.title}</td>
                                    <td className="py-3">
                                        {classItem.description.length > 100
                                            ? `${classItem.description.slice(0, 50)}...`
                                            : classItem.description}
                                    </td>
                                    <td className="py-3">{classItem.name}</td>
                                    <td className="py-3">{classItem.email}</td>
                                    <td className="py-3">
                                        <span
                                            className={`text-${classItem.status === "pending"
                                                    ? "yellow"
                                                    : classItem.status === "accepted"
                                                        ? "green"
                                                        : "red"
                                                }-600`}
                                        >
                                            {classItem.status.charAt(0).toUpperCase() + classItem.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="py-3">
                                        <div className="flex flex-col md:flex-row justify-center md:justify-center items-center space-y-2 md:space-y-0 md:space-x-2">
                                            {classItem.status === "pending" ? (
                                                <>
                                                    {/* Approve Button */}
                                                    <button
                                                        className={`btn btn-sm ${loading === classItem._id
                                                                ? "bg-gray-400 cursor-not-allowed"
                                                                : "bg-green-600 hover:bg-green-700 text-white"
                                                            }`}
                                                        onClick={() => handleApprove(classItem)}
                                                        disabled={loading === classItem._id}
                                                    >
                                                        {loading === classItem._id ? (
                                                            <span className="loader"></span>
                                                        ) : (
                                                            "Approve"
                                                        )}
                                                    </button>

                                                    {/* Reject Button */}
                                                    <button
                                                        className={`btn btn-sm ${loading === classItem._id
                                                                ? "bg-gray-400 cursor-not-allowed"
                                                                : "bg-red-600 hover:bg-red-700 text-white"
                                                            }`}
                                                        onClick={() => handleReject(classItem)}
                                                        disabled={loading === classItem._id}
                                                    >
                                                        {loading === classItem._id ? (
                                                            <span className="loader"></span>
                                                        ) : (
                                                            "Reject"
                                                        )}
                                                    </button>
                                                </>
                                            ) : classItem.status === "accepted" ? (
                                                // Progress Button (Enabled)
                                                <Link to={`/dashboard/progress/${classItem._id}`}>
                                                    <button className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white">
                                                        Progress
                                                    </button>
                                                </Link>
                                            ) : null}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {filteredData && (
                    <div className="mt-10 flex flex-col md:flex-row justify-center md:justify-between items-center gap-3">
                        <div>
                            <span className="">
                                Page {currentPage + 1} of {Math.ceil(filteredData.length / itemsPerPage)}
                            </span>
                        </div>
                        <div>
                            <ReactPaginate
                                previousLabel={
                                    <button className="px-3 py-1 bg-base-300 hover:bg-base-300 rounded-l-lg">
                                        Prev
                                    </button>
                                }
                                nextLabel={
                                    <button className="px-3 py-1 bg-base-300 hover:bg-base-300 rounded-r-lg">
                                        Next
                                    </button>
                                }
                                pageCount={Math.ceil(filteredData.length / itemsPerPage)}
                                onPageChange={handlePageChange}
                                containerClassName={"flex justify-center items-center space-x-2"}
                                pageClassName={"px-3 py-1 mx-1 border cursor-pointer rounded-lg"}
                                activeClassName={"bg-blue-600 text-white"}
                                disabledClassName={"cursor-not-allowed"}
                                pageLinkClassName="block text-center"
                                previousLinkClassName="block text-center"
                                nextLinkClassName="block text-center"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminClass;

