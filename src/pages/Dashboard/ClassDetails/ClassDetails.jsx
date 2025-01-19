// import { useLoaderData } from "react-router-dom";

// const ClassDetails = () => {
//     const classData = useLoaderData(); // Get the loaded data

//     // Check if classData is loaded and has the necessary properties
//     if (!classData) {
//         return <div>Loading...</div>;
//     }

//     const { title, image, name, email, price, description } = classData;

//     return (
//         <div>
//             <h2 className="text-3xl font-bold text-center mb-8">Class Details</h2>
//             <div className="bg-white shadow-md rounded-lg overflow-hidden border hover:shadow-lg transition">
//                 <img
//                     src={image}
//                     alt={title}
//                     className="w-full h-40 object-cover"
//                 />
//                 <div className="p-5 flex flex-col flex-grow">
//                     <h3 className="text-lg font-bold mb-2">{title}</h3>
//                     <p className="text-gray-600 mb-1">
//                         <strong>Name:</strong> {name}
//                     </p>
//                     <p className="text-gray-600 mb-1">
//                         <strong>Email:</strong> {email}
//                     </p>
//                     <p className="text-gray-600 mb-1">
//                         <strong>Price:</strong> ${price}
//                     </p>
//                     <p className="text-gray-600 mb-3">
//                         <strong>Description:</strong> {description}
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ClassDetails;

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
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ClassDetails = () => {
    const classData = useLoaderData();
    const axiosSecure = useAxiosSecure();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    if (!classData) {
        return <div>Loading...</div>;
    }

    const { _id, title } = classData;

    // Handle assignment form submission
    const onSubmit = async (data) => {
        try {
            const response = await axiosSecure.patch(`/details/${_id}`, {
                assignment: data,
            });

            if (response.data.modifiedCount > 0) {
                Swal.fire({
                    icon: "success",
                    title: "Assignment added successfully!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setIsModalOpen(false);
                reset(); // Reset the form
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
        <div className="mt-10">
            <h2 className="text-xl md:text-3xl font-bold text-center mb-8">{title}</h2>

            {/* Class Progress Section */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden border hover:shadow-lg transition mb-8 p-5">
                <h3 className="text-xl font-bold mb-4">Class Progress</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="text-center">
                        <p className="text-gray-600">Total Enrollments</p>
                        <h4 className="text-2xl font-bold">150</h4>
                    </div>
                    <div className="text-center">
                        <p className="text-gray-600">Total Assignments</p>
                        <h4 className="text-2xl font-bold">10</h4>
                    </div>
                    <div className="text-center">
                        <p className="text-gray-600">Total Submissions</p>
                        <h4 className="text-2xl font-bold">120</h4>
                    </div>
                </div>
            </div>

            {/* Class Assignments Section */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden border hover:shadow-lg transition mb-8 p-5">
                <h3 className="text-xl font-bold mb-4">Class Assignments</h3>
                <button
                    className="btn btn-primary"
                    onClick={() => setIsModalOpen(true)}
                >
                    Create Assignment
                </button>
            </div>

            {/* Assignment Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
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
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Add Assignment
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
