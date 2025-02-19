import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaPlus } from "react-icons/fa";
import useCount from "../../../hooks/useCount";
import { Helmet } from "react-helmet-async";

const ClassDetails = () => {
    const classData = useLoaderData();
    const axiosSecure = useAxiosSecure();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [assignments, setAssignments] = useState([]);
    const { totalEnrollment, totalSubmissions } = useCount();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    if (!classData) {
        return <div>Loading...</div>;
    }

    const { _id, title } = classData;

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await axiosSecure.get(`/details/${_id}`);
                if (response.data.assignments) {
                    setAssignments(response.data.assignments);
                }
            } catch (error) {
                console.error("Error fetching assignments:", error);
            }
        };
        fetchAssignments();
    }, [_id, axiosSecure]);

    // Handle assignment form submission
    const onSubmit = async (data) => {
        try {
            const response = await axiosSecure.patch(`/details/${_id}`, {
                assignment: {
                    title: data.title,
                    description: data.description,
                    deadline: data.deadline,
                    submit: "false",
                    assignment: 'some-assignment-id',
                }
            });

            if (response.data.modifiedCount > 0) {
                setAssignments((prevAssignments) => [
                    ...prevAssignments,
                    {
                        title: data.title,
                        description: data.description,
                        deadline: data.deadline,
                        submit: "false",
                        assignment: 'some-assignment-id',
                    }
                ]);

                Swal.fire({
                    icon: "success",
                    title: "Assignment added successfully!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setIsModalOpen(false);
                reset();
            }
        } catch (error) {
            console.error("Error adding assignment:", error);
            Swal.fire({
                icon: "error",
                title: "Failed to add the assignment!",
            });
        }
    };


    return (
        <div className="my-8">
            <Helmet>
                <title>See Details | LearnHive</title>
            </Helmet>

            {/* title */}
            <h2 className="text-xl md:text-4xl font-bold text-center mb-8">{title}</h2>

            {/* Class Progress Section */}
            <div className="shadow-md rounded-lg overflow-hidden border hover:shadow-lg transition mb-10 p-5">
                <h3 className="text-xl font-bold mb-4">Class Progress:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="text-center">
                        <p className="">Total Enrollments</p>
                        <h4 className="text-2xl font-bold">{totalEnrollment ?? 'N/A'}</h4>
                    </div>
                    <div className="text-center">
                        <p className="">Total Assignments</p>
                        <h4 className="text-2xl font-bold">{assignments.length}</h4>
                    </div>
                    <div className="text-center">
                        <p className="">Total Submissions</p>
                        <h4 className="text-2xl font-bold">{totalSubmissions ?? 'N/A'}</h4>
                    </div>
                </div>
            </div>

            {/* Create Assignment Button */}
            <div className="mb-5">
                <button
                    className="btn btn-primary rounded-full"
                    onClick={() => setIsModalOpen(true)}
                >
                    <FaPlus />
                    Create Assignment
                </button>
            </div>

            {/* List of Class Assignments (Card View) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {assignments.map((assignment, index) => (
                    <div
                        key={index}
                        className="shadow-md rounded-lg overflow-hidden border hover:shadow-lg transition p-5"
                    >
                        <h4><strong>Title:</strong> {assignment.title}</h4>
                        <p className="my-1"><strong>Description:</strong> {assignment.description}</p>
                        <p><strong>Deadline:</strong> {assignment.deadline}</p>
                    </div>
                ))}
            </div>

            {/* Assignment Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-3 ">
                    <div className="bg-base-300 rounded-lg shadow-lg w-full max-w-lg p-6 max-h-screen overflow-y-auto">
                        <h3 className="text-xl font-bold mb-4">Add Assignment</h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">
                                    Assignment Title
                                </label>
                                <input
                                    type="text"
                                    {...register("title", { required: "Title is required" })}
                                    className="input input-bordered w-full"
                                    placeholder="Enter assignment title"
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.title.message}
                                    </p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">
                                    Assignment Deadline
                                </label>
                                <input
                                    type="date"
                                    {...register("deadline", { required: "Deadline is required" })}
                                    className="input input-bordered w-full"
                                />
                                {errors.deadline && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.deadline.message}
                                    </p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">
                                    Assignment Description
                                </label>
                                <textarea
                                    {...register("description", { required: "Description is required" })}
                                    className="textarea textarea-bordered w-full"
                                    placeholder="Enter assignment description"
                                ></textarea>
                                {errors.description && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.description.message}
                                    </p>
                                )}
                            </div>
                            <div className="flex justify-between gap-3">
                                <button type="submit" className="btn btn-active btn-primary">
                                    Add Assignment
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-error"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClassDetails;










// Okay code
// import { useLoaderData } from "react-router-dom";

// const ClassDetails = () => {
//     const classData = useLoaderData();

//     if (!classData) {
//         return <div>Loading...</div>;
//     }

//     const { title, image, name, email, price, description } = classData;

//     return (
//         <div className="mt-10">
//             <h2 className="text-xl md:text-3xl font-bold text-center mb-8">{title}</h2>

//             {/* Class Progress Section */}
//             <div className="bg-white shadow-md rounded-lg overflow-hidden border hover:shadow-lg transition mb-8 p-5">
//                 <h3 className="text-xl font-bold mb-4">Class Progress</h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                     <div className="text-center">
//                         <p className="text-gray-600">Total Enrollments</p>
//                         <h4 className="text-2xl font-bold">150</h4>
//                     </div>
//                     <div className="text-center">
//                         <p className="text-gray-600">Total Assignments</p>
//                         <h4 className="text-2xl font-bold">10</h4>
//                     </div>
//                     <div className="text-center">
//                         <p className="text-gray-600">Total Submissions</p>
//                         <h4 className="text-2xl font-bold">120</h4>
//                     </div>
//                 </div>
//             </div>

//             {/* Class Assignments Section */}
//             <div className="bg-white shadow-md rounded-lg overflow-hidden border hover:shadow-lg transition mb-8 p-5">
//                 <h3 className="text-xl font-bold mb-4">Class Assignments</h3>
//                 <button className="btn btn-primary">Create Assignment</button>
//             </div>
//         </div>
//     );
// };

// export default ClassDetails;



// Just try new
// import { useLoaderData } from "react-router-dom";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// const ClassDetails = () => {
//     const classData = useLoaderData();
//     const axiosSecure = useAxiosSecure();
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const { register, handleSubmit, reset, formState: { errors } } = useForm();

//     if (!classData) {
//         return <div>Loading...</div>;
//     }

//     const { _id, title } = classData;

//     // Handle assignment form submission
//     const onSubmit = async (data) => {
//         try {
//             const response = await axiosSecure.patch(`/details/${_id}`, {
//                 assignment: data,
//             });

//             if (response.data.modifiedCount > 0) {
//                 Swal.fire({
//                     icon: "success",
//                     title: "Assignment added successfully!",
//                     showConfirmButton: false,
//                     timer: 1500,
//                 });
//                 setIsModalOpen(false);
//                 reset(); // Reset the form
//             }
//         } catch (error) {
//             console.error("Error adding assignment:", error);
//             Swal.fire({
//                 icon: "error",
//                 title: "Failed to add the assignment!",
//             });
//         }
//     };

//     return (
//         <div className="mt-10">
//             <h2 className="text-xl md:text-3xl font-bold text-center mb-8">{title}</h2>

//             {/* Class Progress Section */}
//             <div className="bg-white shadow-md rounded-lg overflow-hidden border hover:shadow-lg transition mb-8 p-5">
//                 <h3 className="text-xl font-bold mb-4">Class Progress</h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                     <div className="text-center">
//                         <p className="text-gray-600">Total Enrollments</p>
//                         <h4 className="text-2xl font-bold">150</h4>
//                     </div>
//                     <div className="text-center">
//                         <p className="text-gray-600">Total Assignments</p>
//                         <h4 className="text-2xl font-bold">10</h4>
//                     </div>
//                     <div className="text-center">
//                         <p className="text-gray-600">Total Submissions</p>
//                         <h4 className="text-2xl font-bold">120</h4>
//                     </div>
//                 </div>
//             </div>

//             {/* Class Assignments Section */}
//             <div className="bg-white shadow-md rounded-lg overflow-hidden border hover:shadow-lg transition mb-8 p-5">
//                 <h3 className="text-xl font-bold mb-4">Class Assignments</h3>
//                 <button
//                     className="btn btn-primary"
//                     onClick={() => setIsModalOpen(true)}
//                 >
//                     Create Assignment
//                 </button>
//             </div>

//             {/* Assignment Modal */}
//             {isModalOpen && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//                     <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
//                         <h3 className="text-xl font-bold mb-4">Add Assignment</h3>
//                         <form onSubmit={handleSubmit(onSubmit)}>
//                             <div className="mb-4">
//                                 <label className="block text-sm font-medium mb-1">
//                                     Assignment Title
//                                 </label>
//                                 <input
//                                     type="text"
//                                     {...register("title", { required: "Title is required" })}
//                                     className="input input-bordered w-full"
//                                     placeholder="Enter assignment title"
//                                 />
//                                 {errors.title && (
//                                     <p className="text-red-500 text-sm mt-1">
//                                         {errors.title.message}
//                                     </p>
//                                 )}
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-sm font-medium mb-1">
//                                     Assignment Deadline
//                                 </label>
//                                 <input
//                                     type="date"
//                                     {...register("deadline", { required: "Deadline is required" })}
//                                     className="input input-bordered w-full"
//                                 />
//                                 {errors.deadline && (
//                                     <p className="text-red-500 text-sm mt-1">
//                                         {errors.deadline.message}
//                                     </p>
//                                 )}
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-sm font-medium mb-1">
//                                     Assignment Description
//                                 </label>
//                                 <textarea
//                                     {...register("description", { required: "Description is required" })}
//                                     className="textarea textarea-bordered w-full"
//                                     placeholder="Enter assignment description"
//                                 ></textarea>
//                                 {errors.description && (
//                                     <p className="text-red-500 text-sm mt-1">
//                                         {errors.description.message}
//                                     </p>
//                                 )}
//                             </div>
//                             <div className="flex justify-end gap-3">
//                                 <button
//                                     type="button"
//                                     className="btn btn-secondary"
//                                     onClick={() => setIsModalOpen(false)}
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button type="submit" className="btn btn-primary">
//                                     Add Assignment
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ClassDetails;


// count assignment
// import { useLoaderData } from "react-router-dom";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// const ClassDetails = () => {
//     const classData = useLoaderData();
//     const axiosSecure = useAxiosSecure();
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [assignmentCount, setAssignmentCount] = useState(classData.totalAssignments || 0); // Add state for assignment count
//     const { register, handleSubmit, reset, formState: { errors } } = useForm();

//     if (!classData) {
//         return <div>Loading...</div>;
//     }

//     const { _id, title } = classData;

//     // Handle assignment form submission
//     const onSubmit = async (data) => {
//         try {
//             const response = await axiosSecure.patch(`/details/${_id}`, {
//                 assignment: data,
//             });

//             if (response.data.modifiedCount > 0) {
//                 Swal.fire({
//                     icon: "success",
//                     title: "Assignment added successfully!",
//                     showConfirmButton: false,
//                     timer: 1500,
//                 });

//                 // Update assignment count after successful submission
//                 setAssignmentCount((prevCount) => prevCount + 1); // Increment assignment count
//                 setIsModalOpen(false);
//                 reset(); // Reset the form
//             }
//         } catch (error) {
//             console.error("Error adding assignment:", error);
//             Swal.fire({
//                 icon: "error",
//                 title: "Failed to add the assignment!",
//             });
//         }
//     };

//     return (
//         <div className="mt-10">
//             <h2 className="text-xl md:text-3xl font-bold text-center mb-8">{title}</h2>

//             {/* Class Progress Section */}
//             <div className="bg-white shadow-md rounded-lg overflow-hidden border hover:shadow-lg transition mb-8 p-5">
//                 <h3 className="text-xl font-bold mb-4">Class Progress</h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                     <div className="text-center">
//                         <p className="text-gray-600">Total Enrollments</p>
//                         <h4 className="text-2xl font-bold">150</h4>
//                     </div>
//                     <div className="text-center">
//                         <p className="text-gray-600">Total Assignments</p>
//                         <h4 className="text-2xl font-bold">{assignmentCount}</h4> {/* Display updated assignment count */}
//                     </div>
//                     <div className="text-center">
//                         <p className="text-gray-600">Total Submissions</p>
//                         <h4 className="text-2xl font-bold">120</h4>
//                     </div>
//                 </div>
//             </div>

//             {/* Class Assignments Section */}
//             <div className="bg-white shadow-md rounded-lg overflow-hidden border hover:shadow-lg transition mb-8 p-5">
//                 <h3 className="text-xl font-bold mb-4">Class Assignments</h3>
//                 <button
//                     className="btn btn-primary"
//                     onClick={() => setIsModalOpen(true)}
//                 >
//                     Create Assignment
//                 </button>
//             </div>

//             {/* Assignment Modal */}
//             {isModalOpen && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//                     <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
//                         <h3 className="text-xl font-bold mb-4">Add Assignment</h3>
//                         <form onSubmit={handleSubmit(onSubmit)}>
//                             <div className="mb-4">
//                                 <label className="block text-sm font-medium mb-1">
//                                     Assignment Title
//                                 </label>
//                                 <input
//                                     type="text"
//                                     {...register("title", { required: "Title is required" })}
//                                     className="input input-bordered w-full"
//                                     placeholder="Enter assignment title"
//                                 />
//                                 {errors.title && (
//                                     <p className="text-red-500 text-sm mt-1">
//                                         {errors.title.message}
//                                     </p>
//                                 )}
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-sm font-medium mb-1">
//                                     Assignment Deadline
//                                 </label>
//                                 <input
//                                     type="date"
//                                     {...register("deadline", { required: "Deadline is required" })}
//                                     className="input input-bordered w-full"
//                                 />
//                                 {errors.deadline && (
//                                     <p className="text-red-500 text-sm mt-1">
//                                         {errors.deadline.message}
//                                     </p>
//                                 )}
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-sm font-medium mb-1">
//                                     Assignment Description
//                                 </label>
//                                 <textarea
//                                     {...register("description", { required: "Description is required" })}
//                                     className="textarea textarea-bordered w-full"
//                                     placeholder="Enter assignment description"
//                                 ></textarea>
//                                 {errors.description && (
//                                     <p className="text-red-500 text-sm mt-1">
//                                         {errors.description.message}
//                                     </p>
//                                 )}
//                             </div>
//                             <div className="flex justify-end gap-3">
//                                 <button
//                                     type="button"
//                                     className="btn btn-secondary"
//                                     onClick={() => setIsModalOpen(false)}
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button type="submit" className="btn btn-primary">
//                                     Add Assignment
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ClassDetails;

