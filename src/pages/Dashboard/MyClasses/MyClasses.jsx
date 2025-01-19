// import { useQuery } from "@tanstack/react-query";
// import { Helmet } from "react-helmet-async";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import useAuth from "../../../hooks/useAuth";
// import { useNavigate } from "react-router-dom";

// const MyClasses = () => {
//     const { user } = useAuth();
//     const axiosSecure = useAxiosSecure();
//     const navigate = useNavigate();

//     const { data: classes = [], refetch } = useQuery({
//         queryKey: ["classes", user?.email],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/classes/${user.email}`);
//             return res.data;
//         },
//     });

//     const handleDelete = (id) => {
//         Swal.fire({
//             title: "Are you sure?",
//             text: "Do you want to delete this class?",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#d33",
//             cancelButtonColor: "#3085d6",
//             confirmButtonText: "Yes, delete it!",
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 axiosSecure
//                     .delete(`/classes/${id}`)
//                     .then(() => {
//                         refetch();
//                         Swal.fire("Deleted!", "The class has been deleted.", "success");
//                     })
//                     .catch(() => {
//                         Swal.fire("Error!", "There was an issue deleting the class.", "error");
//                     });
//             }
//         });
//     };

//     const handleUpdate = async (id) => {
//         const { value: formValues } = await Swal.fire({
//             title: "Update Class",
//             html:
//                 '<input id="title" class="swal2-input" placeholder="Title">' +
//                 '<input id="description" class="swal2-input" placeholder="Description">' +
//                 '<input id="price" class="swal2-input" placeholder="Price">',
//             focusConfirm: false,
//             showCancelButton: true,
//             preConfirm: () => {
//                 return {
//                     title: document.getElementById('title').value,
//                     description: document.getElementById('description').value,
//                     price: document.getElementById('price').value
//                 }
//             }
//         });

//         if (formValues) {
//             axiosSecure
//                 .put(`/classes/${id}`, formValues)
//                 .then(() => {
//                     refetch();
//                     Swal.fire("Updated!", "The class has been updated.", "success");
//                 })
//                 .catch(() => {
//                     Swal.fire("Error!", "There was an issue updating the class.", "error");
//                 });
//         }
//     };

//     const handleSeeDetails = (id) => {
//         navigate(`/dashboard/my-class/${id}`); // Redirect to the details page
//     };

//     return (
//         <div>
//             <Helmet>
//                 <title>My Classes || LearnHive</title>
//             </Helmet>
//             <h2 className="text-3xl font-bold text-center mb-8">My Classes</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {classes.map((classItem) => (
//                     <div
//                         key={classItem._id}
//                         className="bg-white shadow-md rounded-lg overflow-hidden border hover:shadow-lg transition flex flex-col"
//                     >
//                         <img
//                             src={classItem.image}
//                             alt={classItem.title}
//                             className="w-full h-40 object-cover"
//                         />
//                         <div className="p-5 flex flex-col flex-grow">
//                             <h3 className="text-lg font-bold mb-2">{classItem.title}</h3>
//                             <p className="text-gray-600 mb-1">
//                                 <strong>Name:</strong> {classItem.name}
//                             </p>
//                             <p className="text-gray-600 mb-1">
//                                 <strong>Email:</strong> {classItem.email}
//                             </p>
//                             <p className="text-gray-600 mb-1">
//                                 <strong>Price:</strong> ${classItem.price}
//                             </p>
//                             <p className="text-gray-600 mb-3">
//                                 <strong>Description:</strong> {classItem.description}
//                             </p>
//                             <p
//                                 className={`text-sm font-bold mb-4 ${classItem.status === "pending"
//                                     ? "text-yellow-500"
//                                     : classItem.status === "approved"
//                                         ? "text-green-500"
//                                         : "text-red-500"
//                                     }`}
//                             >
//                                 Status: {classItem.status.charAt(0).toUpperCase() + classItem.status.slice(1)}
//                             </p>
//                             <div className="mt-auto">
//                                 <div className="flex flex-col md:flex-row justify-between mb-2">
//                                     <button
//                                         className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white flex-1"
//                                         onClick={() => handleUpdate(classItem._id)}
//                                     >
//                                         Update
//                                     </button>
//                                     <button
//                                         className="btn btn-sm bg-red-500 hover:bg-red-600 text-white ml-2 flex-1"
//                                         onClick={() => handleDelete(classItem._id)}
//                                     >
//                                         Delete
//                                     </button>
//                                 </div>
//                                 <button
//                                     className={`btn btn-sm ${classItem.status === "accepted"
//                                         ? "bg-green-500 hover:bg-green-600 text-white"
//                                         : "bg-gray-400 text-gray-700 cursor-not-allowed"
//                                         } w-full`}
//                                     onClick={() =>
//                                         classItem.status === "accepted" && handleSeeDetails(classItem._id)
//                                     }
//                                     disabled={classItem.status !== "accepted"}
//                                 >
//                                     See Details
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default MyClasses;




// updated code
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const MyClasses = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [selectedClass, setSelectedClass] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { register, handleSubmit, reset } = useForm();

    const { data: classes = [], refetch } = useQuery({
        queryKey: ["classes", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/classes/${user.email}`);
            return res.data;
        },
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to delete this class?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .delete(`/classes/${id}`)
                    .then(() => {
                        refetch();
                        Swal.fire("Deleted!", "The class has been deleted.", "success");
                    })
                    .catch(() => {
                        Swal.fire("Error!", "There was an issue deleting the class.", "error");
                    });
            }
        });
    };

    const openModal = (classItem) => {
        setSelectedClass(classItem);
        reset(classItem);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedClass(null);
        setIsModalOpen(false);
    };

    // const handleUpdate = (data) => {
    //     axiosSecure
    //         .patch(`/classes/${selectedClass._id}`, data)
    //         .then(() => {
    //             refetch();
    //             closeModal();
    //             Swal.fire({
    //                 icon: "success",
    //                 text: "Updated!",
    //                 title: "The class has been updated.",
    //                 showConfirmButton: false,
    //                 timer: 1500
    //             });
    //         })
    //         .catch(() => {
    //             Swal.fire({
    //                 icon: "error",
    //                 text: "Error!",
    //                 title: "There was an issue updating the class.",
    //                 showConfirmButton: false,
    //                 timer: 1500
    //             });
    //         });
    // };

    const handleUpdate = (data) => {
        // Check if the data has changed
        const isDataUnchanged =
            data.title === selectedClass.title &&
            data.description === selectedClass.description &&
            data.price === selectedClass.price;

        if (isDataUnchanged) {
            Swal.fire({
                icon: "info",
                text: "No changes were made.",
                title: "Update Skipped",
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }

        // Proceed with the update if data has changed
        axiosSecure
            .patch(`/classes/${selectedClass._id}`, data)
            .then(() => {
                refetch();
                closeModal();
                Swal.fire({
                    icon: "success",
                    text: "The class has been updated.",
                    title: "Updated!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    text: "There was an issue updating the class.",
                    title: "Error!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            });
    };


    // const handleSeeDetails = (id) => {
    //     navigate(`/dashboard/my-class/${id}`);
    // };

    return (
        <div className="mt-8">
            <Helmet>
                <title>My Classes || LearnHive</title>
            </Helmet>
            <h2 className="text-3xl font-bold text-center mb-8">My Classes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classes.map((classItem) => (
                    <div
                        key={classItem._id}
                        className="bg-white shadow-md rounded-lg overflow-hidden border hover:shadow-lg transition flex flex-col"
                    >
                        <img
                            src={classItem.image}
                            alt={classItem.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-5 flex flex-col flex-grow">
                            <h3 className="text-lg font-bold mb-2">{classItem.title}</h3>
                            <p className="text-gray-600 mb-1">
                                <strong>Name:</strong> {classItem.name}
                            </p>
                            <p className="text-gray-600 mb-1">
                                <strong>Email:</strong> {classItem.email}
                            </p>
                            <p className="text-gray-600 mb-1">
                                <strong>Price:</strong> ${classItem.price}
                            </p>
                            <p className="text-gray-600 mb-3">
                                <strong>Description:</strong> {classItem.description}
                            </p>
                            <p
                                className={`text-sm font-bold mb-4 ${classItem.status === "pending"
                                    ? "text-yellow-500"
                                    : classItem.status === "approved"
                                        ? "text-red-500"
                                        : "text-green-500"
                                    }`}
                            >
                                Status: {classItem.status.charAt(0).toUpperCase() + classItem.status.slice(1)}
                            </p>
                            <div className="mt-auto">
                                <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-5 mb-2">
                                    <button
                                        className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white flex-1"
                                        onClick={() => openModal(classItem)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="btn btn-sm bg-red-500 hover:bg-red-600 text-white flex-1"
                                        onClick={() => handleDelete(classItem._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                                <Link to={classItem.status === "accepted" ? `/dashboard/my-class/${classItem._id}` : "#"}>
                                    <button
                                        className={`btn btn-sm ${classItem.status === "accepted"
                                            ? "bg-green-500 hover:bg-green-600 text-white"
                                            : "bg-gray-400 text-gray-700 cursor-not-allowed"
                                            } w-full`}
                                        disabled={classItem.status !== "accepted"}
                                    >
                                        See Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-96 max-h-screen overflow-y-auto p-6 relative">
                        {/* Close Icon */}
                        <button
                            onClick={closeModal}
                            className="absolute top-3 right-3 text-gray-500 hover:text-red-700 focus:outline-none"
                        >
                            <FaTimes size={20} />
                        </button>
                        <h3 className="text-xl font-bold mb-4">Update Class</h3>
                        <form onSubmit={handleSubmit(handleUpdate)}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Title</label>
                                <input
                                    {...register("title")}
                                    className="input input-bordered w-full"
                                    type="text"
                                    placeholder="Enter title"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Description</label>
                                <textarea
                                    {...register("description")}
                                    className="textarea textarea-bordered w-full"
                                    placeholder="Enter description"
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Price</label>
                                <input
                                    {...register("price")}
                                    className="input input-bordered w-full"
                                    type="text"
                                    placeholder="Enter price"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button type="submit" className="btn btn-primary">
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyClasses;
