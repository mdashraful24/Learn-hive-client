import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const AdminClass = () => {
    const axiosSecure = useAxiosSecure();
    const { loading, setLoading } = useAuth();
    const [progressButtonEnabled, setProgressButtonEnabled] = useState(false);

    // Fetch classes
    const { data, refetch } = useQuery({
        queryKey: ["adminClasses"],
        queryFn: async () => {
            const res = await axiosSecure.get("/classes");
            return res.data;
        },
    });

    // Handle Approve
    const handleApprove = (classItem) => {
        setLoading(classItem._id); // Set loading state for the specific class
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
                        setProgressButtonEnabled(true); // Enable the progress button
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
                    .finally(() => setLoading(null)); // Reset loading state
            } else {
                setLoading(null); // Reset loading state
            }
        });
    };

    // Handle Reject
    const handleReject = (classItem) => {
        setLoading(classItem._id); // Set loading state for the specific class
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
                        setProgressButtonEnabled(false); // Disable progress button for rejected classes
                        Swal.fire("Rejected!", "The class has been rejected.", "error");
                    })
                    .catch(() => {
                        Swal.fire({
                            title: "Error!",
                            text: "There was an issue rejecting the class.",
                            icon: "error",
                        });
                    })
                    .finally(() => setLoading(null)); // Reset loading state
            } else {
                setLoading(null); // Reset loading state
            }
        });
    };

    return (
        <div className="mt-10 md:mt-14 mb-20 px-5 lg:px-5">
            <div className="p-5 md:p-8 shadow-lg rounded-lg border">
                <h2 className="text-3xl font-bold text-center mb-6">Admin Classes</h2>

                <div className="overflow-x-auto rounded-t-xl mt-5">
                    <table className="table">
                        {/* Table Head */}
                        <thead>
                            <tr className="bg-[#D1A054] text-white text-center uppercase">
                                <th className="py-5">#</th>
                                <th className="py-5">Title</th>
                                <th className="py-5">Image</th>
                                <th className="py-5">Email</th>
                                <th className="py-5">Description</th>
                                <th className="py-5">Status</th>
                                <th className="py-5">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((classItem, index) => (
                                <tr key={classItem._id} className="text-center hover:bg-gray-50">
                                    <td className="py-5 font-bold">{index + 1}</td>
                                    <td className="py-5">{classItem.title}</td>
                                    <td className="py-5">
                                        <img
                                            src={classItem.image}
                                            alt={classItem.title}
                                            className="w-12 h-12 rounded mx-auto"
                                        />
                                    </td>
                                    <td className="py-5">{classItem.email}</td>
                                    <td className="py-5">{classItem.description}</td>
                                    <td className="py-5">
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
                                    <td className="py-7 flex justify-center items-center">
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
                                                        } ml-2`}
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
                                            <button
                                                className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white"
                                            >
                                                Progress
                                            </button>
                                        ) : (
                                            // Rejected Button (Disabled)
                                            <button
                                                className="btn btn-sm bg-gray-400 cursor-not-allowed"
                                                disabled
                                            >
                                                Rejected
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminClass;
