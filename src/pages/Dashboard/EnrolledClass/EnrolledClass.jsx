// Updated code
import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FaPlus, FaTimes } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const EnrolledClass = () => {
    const { user } = useAuth();
    const course = useLoaderData();
    const { _id, title, description, assignments } = course;

    const { register, handleSubmit, setValue, reset } = useForm();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [submittedAssignments, setSubmittedAssignments] = useState([]);

    const axiosPublic = useAxiosPublic();

    const openModal = (assignment) => {
        setSelectedAssignment(assignment);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedAssignment(null);
    };

    const onSubmit = async (data) => {
        if (!selectedAssignment || !user) {
            console.log("Missing assignment or user data");
            return;
        }

        const submissionData = {
            courseId: _id,
            userEmail: user.email,
            submission: data.assignmentText,
            submit: 1
        };

        console.log("Submission Data:", submissionData);

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

    return (
        <div className="mt-10">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">List of all Assignment</h2>

            <table className="min-w-full border">
                <thead>
                    <tr className="bg-[#D1A054] text-white text-center  rounded-t-xl uppercase">
                        <th className="py-2 px-4 border-b">Title</th>
                        <th className="py-2 px-4 border-b">Description</th>
                        <th className="py-2 px-4 border-b">Deadline</th>
                        <th className="py-2 px-4 border-b">Submit</th>
                    </tr>
                </thead>
                <tbody>
                    {assignments && assignments.length > 0 ? (
                        assignments.map((assignment, index) => (
                            <tr key={index} className="text-center capitalize hover:bg-gray-50">
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
                            <td colSpan="4" className="py-2 px-4 text-center">No Assignments</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Modal with smooth transition */}
            {modalIsOpen && selectedAssignment && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-500 opacity-100 px-5 md:px-0">
                    <div className="bg-white p-6 rounded-md shadow-xl w-[500px] mx-auto relative transition-all duration-500 opacity-100">
                        <h2 className="text-lg md:text-2xl font-bold text-center mb-3">Submit Assignment</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
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
                                className="btn bg-zinc-800 hover:bg-zinc-950 text-white w-full"
                            >
                                Submit
                            </button>
                        </form>

                        {/* Cross Icon Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
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
