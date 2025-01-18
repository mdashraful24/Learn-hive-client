import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import RatingStars from "react-rating-stars-component";
import { FaPlus, FaTimes } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2"; // Import SweetAlert2
import { useForm } from "react-hook-form"; // Import useForm

const EnrolledClass = () => {
    const { user } = useAuth(); // Get user information
    const course = useLoaderData(); // Get course data
    const { title, description, assignments } = course; // Extract relevant course details

    const { register, handleSubmit, setValue, reset } = useForm(); // useForm hooks
    const [rating, setRating] = useState(0); // Rating state
    const axiosPublic = useAxiosPublic();

    const onSubmit = async (data) => {
        const reportData = {
            description: data.reportDescription,
            rating,
            courseId: course._id,
            courseTitle: title,
            name: user?.displayName,
            image: user?.photoURL,
        };

        try {
            // Sending feedback to the server
            await axiosPublic.post("/ter-reports", reportData);

            // Show success alert using SweetAlert2
            Swal.fire({
                icon: "success",
                title: "Feedback sent successfully!",
                text: "Your feedback has been submitted.",
                showConfirmButton: false,
                timer: 1500
            });

            // Reset the form after submission
            reset();
            setRating(0); // Reset the rating

            closeModal(); // Close the modal
        } catch (error) {
            console.error("Error submitting report:", error);
            Swal.fire({
                icon: "error",
                title: "Oops!",
                text: "Something went wrong. Please try again.",
            });
        }
    };

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const handleRatingChange = (newRating = 0) => {
        setRating(newRating);
        setValue("rating", newRating); // Set rating value in the form
    };

    return (
        <div>
            <button
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 mb-5"
                onClick={openModal}
            >
                <FaPlus />
                Teaching Evaluation
            </button>

            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-4">My Enrolled Classes</h2>

            <table className="min-w-full bg-white border">
                <thead className="bg-gray-300">
                    <tr>
                        <th className="py-2 px-4 border-b">Title</th>
                        <th className="py-2 px-4 border-b">Description</th>
                        <th className="py-2 px-4 border-b">Deadline</th>
                        <th className="py-2 px-4 border-b">Assignments</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="text-center">
                        <td className="py-2 px-4 border-b">{title}</td>
                        <td className="py-2 px-4 border-b">{description}</td>
                        <td className="py-2 px-4 border-b">{assignments ? assignments.deadline : "N/A"}</td>
                        <td className="py-2 px-4 border-b">{assignments ? assignments.title : "No Assignments"}</td>
                    </tr>
                </tbody>
            </table>

            {/* Modal with smooth transition */}
            {modalIsOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-500 opacity-100">
                    <div className="bg-white p-6 rounded-md shadow-xl w-[500px] mx-auto relative transition-all duration-500 opacity-100">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-2">
                                <label className="block text-gray-700 mb-2">Description</label>
                                <textarea
                                    className="w-full p-3 border border-gray-300 rounded-md"
                                    {...register("reportDescription", { required: true })}
                                    placeholder="Provide feedback or description of the teaching experience"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700">Rating</label>
                                <RatingStars
                                    count={5}
                                    onChange={handleRatingChange}
                                    size={30}
                                    activeColor="#ffd700"
                                    value={rating}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary w-full"
                            >
                                Send
                            </button>
                        </form>

                        {/* Cross Icon Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            style={{ background: 'transparent', border: 'none' }}
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
