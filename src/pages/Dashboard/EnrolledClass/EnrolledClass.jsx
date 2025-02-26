import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FaPlus, FaTimes } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import ReactStars from "react-rating-stars-component";
import { Helmet } from "react-helmet-async";

const EnrolledClass = () => {
    const { user } = useAuth();
    const course = useLoaderData();
    const { _id, title, description, assignments } = course;

    const { register, handleSubmit, setValue, reset } = useForm();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [evaluationModalIsOpen, setEvaluationModalIsOpen] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [submittedAssignments, setSubmittedAssignments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const assignmentsPerPage = 10;

    const axiosPublic = useAxiosPublic();

    const openModal = (assignment) => {
        setSelectedAssignment(assignment);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedAssignment(null);
    };

    const openEvaluationModal = () => {
        setEvaluationModalIsOpen(true);
    };

    const closeEvaluationModal = () => {
        setEvaluationModalIsOpen(false);
    };

    const onSubmitAssignment = async (data) => {
        if (!selectedAssignment || !user) {
            // console.log("Missing assignment or user data");
            return;
        }

        const submissionData = {
            courseId: _id,
            userEmail: user.email,
            submission: data.assignmentText,
            submit: 1
        };

        // console.log("Submission Data:", submissionData);

        try {
            await axiosPublic.post("/assignments", submissionData);

            setSubmittedAssignments((prev) => [...prev, selectedAssignment._id]);

            Swal.fire({
                icon: "success",
                title: "Assignment submitted successfully!",
                showConfirmButton: false,
                timer: 1500,
            });

            reset();
            closeModal();
        } catch (error) {
            console.error("Error submitting assignment:", error);
            Swal.fire({
                icon: "error",
                title: "Oops!",
                text: "Something went wrong. Please try again.",
            });
        }
    };

    const onSubmitEvaluation = async (data) => {
        if (!user) {
            // console.log("User data missing");
            return;
        }

        const evaluationData = {
            courseId: _id,
            userName: user.displayName,
            image: user.photoURL,
            title: course.title,
            rating: data.rating,
            description: data.description
        };

        try {
            await axiosPublic.post("/ter-reports", evaluationData);

            Swal.fire({
                icon: "success",
                title: "Evaluation submitted successfully!",
                showConfirmButton: false,
                timer: 1500,
            });

            reset();
            closeEvaluationModal();
        } catch (error) {
            console.error("Error submitting evaluation:", error);
            Swal.fire({
                icon: "error",
                title: "Oops!",
                text: "Something went wrong. Please try again.",
            });
        }
    };

    // Pagination logic
    const indexOfLastAssignment = currentPage * assignmentsPerPage;
    const indexOfFirstAssignment = indexOfLastAssignment - assignmentsPerPage;
    const currentAssignments = assignments.slice(indexOfFirstAssignment, indexOfLastAssignment);

    const totalPages = Math.max(1, Math.ceil(assignments.length / assignmentsPerPage));

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };


    return (
        <div className="mb-16">
            <Helmet>
                <title>My Enroll Class Details | LearnHive</title>
            </Helmet>

            <div className="text-end my-7">
                <button
                    onClick={openEvaluationModal}
                    className="btn px-4 py-2 rounded-full bg-zinc-700 hover:bg-zinc-800 text-white"
                >
                    <FaPlus />
                    Teaching Evaluation
                </button>
            </div>


            <h2 className="text-2xl md:text-3xl font-bold text-center mb-7 lg:-mt-7">List of all Assignments</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full border">
                    <thead>
                        <tr className="bg-blue-700 text-white text-center rounded-t-xl uppercase">
                            <th className="py-2 px-4 border-b">Title</th>
                            <th className="py-2 px-4 border-b">Description</th>
                            <th className="py-2 px-4 border-b">Deadline</th>
                            <th className="py-2 px-4 border-b">Submit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentAssignments.length > 0 ? (
                            currentAssignments.map((assignment, index) => (
                                <tr key={index} className="text-center capitalize hover:bg-base-200">
                                    <td className="py-2 px-4 border-b">{assignment.title}</td>
                                    <td className="py-2 px-4 border-b">{assignment.description}</td>
                                    <td className="py-2 px-4 border-b">{assignment.deadline}</td>
                                    <td className="py-2 px-4 border-b">
                                        {submittedAssignments.includes(assignment._id) ? (
                                            <span className="text-green-500 font-bold">Submitted</span>
                                        ) : (
                                            <button
                                                onClick={() => openModal(assignment)}
                                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                            >
                                                Submit
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                    <td colSpan="4" className="py-2 px-4 text-center">Currently, no assignments are available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {assignments.length > 0 && (
                <div className="mt-10 flex flex-col md:flex-row justify-center md:justify-between items-center gap-3">
                    <span className="">Page {currentPage} of {totalPages}</span>
                    <div>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-2 py-1 mx-1 rounded bg-base-200 hover:bg-base-300"
                        >
                            Prev
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`px-3 py-1 mx-1 rounded ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-2 py-1 mx-1 rounded bg-base-200 hover:bg-base-300"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}


            {/* Modal for Assignment Submission */}
            {modalIsOpen && selectedAssignment && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-500 opacity-100 px-5 md:px-0">
                    <div className="bg-base-300 p-6 rounded-md shadow-xl w-[500px] mx-auto relative transition-all duration-500 opacity-100 border">
                        <h2 className="text-lg md:text-2xl font-bold text-center mb-3">Submit Assignment</h2>
                        <form onSubmit={handleSubmit(onSubmitAssignment)}>
                            <div className="mb-2">
                                <input
                                    type="text"
                                    {...register("assignmentText", { required: true })}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="Enter your submission here (e.g., a link or text)"
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn bg-blue-600 hover:bg-blue-700 text-white w-full"
                            >
                                Submit
                            </button>
                        </form>

                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 hover:text-red-700"
                            style={{ background: "transparent", border: "none" }}
                        >
                            <FaTimes size={24} />
                        </button>
                    </div>
                </div>
            )}

            {/* Modal for Teaching Evaluation Report */}
            {evaluationModalIsOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-5 md:px-0 overflow-y-auto">
                    <div className="bg-base-300 p-6 rounded-md shadow-xl w-[500px] mx-auto relative max-h-[90vh] overflow-y-auto border">
                        <h2 className="text-lg md:text-2xl font-bold text-center mb-3">Teaching Evaluation Report</h2>
                        <form onSubmit={handleSubmit(onSubmitEvaluation)}>
                            <div className="mb-2">
                                <label className="block font-medium">Rating</label>
                                <ReactStars
                                    count={5}
                                    onChange={(rating) => setValue("rating", rating)}
                                    size={30}
                                    activeColor="#ffd700"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block font-medium mb-1">Description</label>
                                <textarea
                                    id="description"
                                    {...register("description", { required: true })}
                                    rows="4"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="Enter your feedback..."
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn bg-blue-600 hover:bg-blue-700 text-white w-full"
                            >
                                Submit Evaluation
                            </button>
                        </form>
                        <button
                            onClick={closeEvaluationModal}
                            className="absolute top-2 right-2 hover:text-red-700"
                            style={{ background: "transparent", border: "none" }}
                        >
                            <FaTimes size={24} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EnrolledClass;
