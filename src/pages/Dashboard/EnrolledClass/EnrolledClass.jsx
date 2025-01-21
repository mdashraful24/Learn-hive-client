// import React, { useState } from "react";
// import { useLoaderData } from "react-router-dom";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";
// import { FaPlus, FaTimes } from "react-icons/fa";
// import useAuth from "../../../hooks/useAuth";
// import Swal from "sweetalert2";
// import { useForm } from "react-hook-form";
// import ReactStars from "react-rating-stars-component";

// const EnrolledClass = () => {
//     const { user } = useAuth();
//     const course = useLoaderData();
//     const { _id, title, description, assignments } = course;

//     const { register, handleSubmit, setValue, reset } = useForm();
//     const [modalIsOpen, setModalIsOpen] = useState(false);
//     const [evaluationModalIsOpen, setEvaluationModalIsOpen] = useState(false);
//     const [selectedAssignment, setSelectedAssignment] = useState(null);
//     const [submittedAssignments, setSubmittedAssignments] = useState([]);

//     const axiosPublic = useAxiosPublic();

//     const openModal = (assignment) => {
//         setSelectedAssignment(assignment);
//         setModalIsOpen(true);
//     };

//     const closeModal = () => {
//         setModalIsOpen(false);
//         setSelectedAssignment(null);
//     };

//     const openEvaluationModal = () => {
//         setEvaluationModalIsOpen(true);
//     };

//     const closeEvaluationModal = () => {
//         setEvaluationModalIsOpen(false);
//     };

//     const onSubmitAssignment = async (data) => {
//         if (!selectedAssignment || !user) {
//             console.log("Missing assignment or user data");
//             return;
//         }

//         const submissionData = {
//             courseId: _id,
//             userEmail: user.email,
//             submission: data.assignmentText,
//             submit: 1
//         };

//         console.log("Submission Data:", submissionData);

//         try {
//             await axiosPublic.post("/assignments", submissionData);

//             setSubmittedAssignments((prev) => [...prev, selectedAssignment._id]);

//             Swal.fire({
//                 icon: "success",
//                 title: "Assignment submitted successfully!",
//                 showConfirmButton: false,
//                 timer: 1500,
//             });

//             reset();
//             closeModal();
//         } catch (error) {
//             console.error("Error submitting assignment:", error);
//             Swal.fire({
//                 icon: "error",
//                 title: "Oops!",
//                 text: "Something went wrong. Please try again.",
//             });
//         }
//     };

//     const onSubmitEvaluation = async (data) => {
//         if (!user) {
//             console.log("User data missing");
//             return;
//         }

//         const evaluationData = {
//             courseId: _id,
//             // userEmail: user.email,
//             userName: user.displayName,
//             image: user.photoURL,  // Assuming you have a user image available
//             title: course.title,
//             rating: data.rating,
//             description: data.description
//         };
//         console.log(evaluationData)

//         console.log("Evaluation Data:", evaluationData);

//         try {
//             await axiosPublic.post("/ter-reports", evaluationData);

//             Swal.fire({
//                 icon: "success",
//                 title: "Evaluation submitted successfully!",
//                 showConfirmButton: false,
//                 timer: 1500,
//             });

//             reset();
//             closeEvaluationModal();
//         } catch (error) {
//             console.error("Error submitting evaluation:", error);
//             Swal.fire({
//                 icon: "error",
//                 title: "Oops!",
//                 text: "Something went wrong. Please try again.",
//             });
//         }
//     };

//     return (
//         <div className="mb-16">
//             {/* Teaching Evaluation Report (TER) Button */}
//             <div className="text-end my-10">
//                 <button
//                     onClick={openEvaluationModal}
//                     className="btn btn-success"
//                 >
//                     <FaPlus />
//                     TER
//                 </button>
//             </div>

//             <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">List of all Assignment</h2>

//             <div className="overflow-x-auto">
//                 <table className="min-w-full border">
//                     <thead>
//                         <tr className="bg-[#D1A054] text-white text-center rounded-t-xl uppercase">
//                             <th className="py-2 px-4 border-b">Title</th>
//                             <th className="py-2 px-4 border-b">Description</th>
//                             <th className="py-2 px-4 border-b">Deadline</th>
//                             <th className="py-2 px-4 border-b">Submit</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {assignments && assignments.length > 0 ? (
//                             assignments.map((assignment, index) => (
//                                 <tr key={index} className="text-center capitalize hover:bg-gray-50">
//                                     <td className="py-2 px-4 border-b">{assignment.title}</td>
//                                     <td className="py-2 px-4 border-b">{assignment.description}</td>
//                                     <td className="py-2 px-4 border-b">{assignment.deadline}</td>
//                                     <td className="py-2 px-4 border-b">
//                                         {submittedAssignments.includes(assignment._id) ? (
//                                             <span className="text-green-500 font-bold">Submitted</span>
//                                         ) : (
//                                             <button
//                                                 onClick={() => openModal(assignment)}
//                                                 className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//                                             >
//                                                 Submit
//                                             </button>
//                                         )}
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="4" className="py-2 px-4 text-center">No Assignments</td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>


//             {/* Modal for Assignment Submission */}
//             {modalIsOpen && selectedAssignment && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-500 opacity-100 px-5 md:px-0">
//                     <div className="bg-white p-6 rounded-md shadow-xl w-[500px] mx-auto relative transition-all duration-500 opacity-100">
//                         <h2 className="text-lg md:text-2xl font-bold text-center mb-3">Submit Assignment</h2>
//                         <form onSubmit={handleSubmit(onSubmitAssignment)}>
//                             <div className="mb-2">
//                                 <input
//                                     type="text"
//                                     {...register("assignmentText", { required: true })}
//                                     className="w-full p-2 border border-gray-300 rounded-md"
//                                     placeholder="Enter your submission here (e.g., a link or text)"
//                                 />
//                             </div>
//                             <button
//                                 type="submit"
//                                 className="btn bg-zinc-800 hover:bg-zinc-950 text-white w-full"
//                             >
//                                 Submit
//                             </button>
//                         </form>

//                         <button
//                             onClick={closeModal}
//                             className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//                             style={{ background: "transparent", border: "none" }}
//                         >
//                             <FaTimes size={24} />
//                         </button>
//                     </div>
//                 </div>
//             )}

//             {/* Modal for Teaching Evaluation Report */}
//             {evaluationModalIsOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-5 md:px-0 overflow-y-auto">
//                     <div className="bg-white p-6 rounded-md shadow-xl w-[500px] mx-auto relative max-h-[90vh] overflow-y-auto">
//                         <h2 className="text-lg md:text-2xl font-bold text-center mb-3">Teaching Evaluation Report</h2>
//                         <form onSubmit={handleSubmit(onSubmitEvaluation)}>
//                             <div className="mb-4">
//                                 <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
//                                 <textarea
//                                     id="description"
//                                     {...register("description", { required: true })}
//                                     rows="4"
//                                     className="w-full p-2 border border-gray-300 rounded-md"
//                                     placeholder="Enter your feedback..."
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-sm font-medium text-gray-700">Rating</label>
//                                 <ReactStars
//                                     count={5}
//                                     onChange={(value) => setValue("rating", value)}
//                                     size={24}
//                                     activeColor="#ffd700"
//                                 />
//                             </div>
//                             <button
//                                 type="submit"
//                                 className="btn bg-zinc-800 hover:bg-zinc-950 text-white w-full"
//                             >
//                                 Send Feedback
//                             </button>
//                         </form>

//                         <button
//                             onClick={closeEvaluationModal}
//                             className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//                             style={{ background: "transparent", border: "none" }}
//                         >
//                             <FaTimes size={24} />
//                         </button>
//                     </div>
//                 </div>
//             )}

//         </div>
//     );
// };

// export default EnrolledClass;









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

    const onSubmitEvaluation = async (data) => {
        if (!user) {
            console.log("User data missing");
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

    const totalPages = Math.ceil(assignments.length / assignmentsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="mb-16">
            <Helmet>
                <title>My Enroll Class Details | LearnHive</title>
            </Helmet>

            <div className="text-end my-7">
                <button
                    onClick={openEvaluationModal}
                    className={`btn px-4 py-2 rounded ${assignments.length > 0 ? "bg-purple-700 hover:bg-purple-800 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                    disabled={assignments.length === 0}
                >
                    <FaPlus />
                    Teaching Evaluation
                </button>
            </div>


            <h2 className="text-2xl md:text-3xl font-bold text-center mb-7 lg:-mt-7">List of all Assignments</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full border">
                    <thead>
                        <tr className="bg-[#D1A054] text-white text-center rounded-t-xl uppercase">
                            <th className="py-2 px-4 border-b">Title</th>
                            <th className="py-2 px-4 border-b">Description</th>
                            <th className="py-2 px-4 border-b">Deadline</th>
                            <th className="py-2 px-4 border-b">Submit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentAssignments.length > 0 ? (
                            currentAssignments.map((assignment, index) => (
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
            </div>

            {/* Pagination Controls */}
            {/* <div className="flex justify-center mt-7">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 mx-1 rounded ${currentPage === page ? "border border-black rounded-full" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
                    >
                        {page}
                    </button>
                ))}
            </div> */}
            <div className="flex justify-between mt-7 items-center">
                <span className="text-gray-800">Page {currentPage} of {totalPages}</span>

                <div>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-2 py-1 mx-1 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
                    >
                        &lt; Prev
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
                        className="px-2 py-1 mx-1 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
                    >
                        Next &gt;
                    </button>
                </div>
            </div>



            {/* Modal for Assignment Submission */}
            {modalIsOpen && selectedAssignment && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-500 opacity-100 px-5 md:px-0">
                    <div className="bg-white p-6 rounded-md shadow-xl w-[500px] mx-auto relative transition-all duration-500 opacity-100">
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
                                className="btn bg-zinc-800 hover:bg-zinc-950 text-white w-full"
                            >
                                Submit
                            </button>
                        </form>

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

            {/* Modal for Teaching Evaluation Report */}
            {evaluationModalIsOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-5 md:px-0 overflow-y-auto">
                    <div className="bg-white p-6 rounded-md shadow-xl w-[500px] mx-auto relative max-h-[90vh] overflow-y-auto">
                        <h2 className="text-lg md:text-2xl font-bold text-center mb-3">Teaching Evaluation Report</h2>
                        <form onSubmit={handleSubmit(onSubmitEvaluation)}>
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    id="description"
                                    {...register("description", { required: true })}
                                    rows="4"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="Enter your feedback..."
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Rating</label>
                                <ReactStars
                                    count={5}
                                    onChange={(rating) => setValue("rating", rating)}
                                    size={30}
                                    activeColor="#ffd700"
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn bg-zinc-800 hover:bg-zinc-950 text-white w-full"
                            >
                                Submit Evaluation
                            </button>
                        </form>
                        <button
                            onClick={closeEvaluationModal}
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
