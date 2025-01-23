import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import ReactPaginate from "react-paginate";

const MyClasses = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();
    const [selectedClass, setSelectedClass] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 9;

    const { data: classes = [], isLoading, refetch } = useQuery({
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

    const handleUpdate = (data) => {
        const isDataUnchanged =
            data.title === selectedClass.title &&
            data.description === selectedClass.description &&
            data.price === parseFloat(selectedClass.price);

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

    // Pagination Logic: Slice the classes to show only the current page
    const paginatedClasses = classes.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    // Handle page change
    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    if (isLoading) {
        return (
            <div className="container mx-auto text-center mt-10">
                <p className="text-gray-500">Loading classes...</p>
            </div>
        );
    }

    if (classes.length === 0) {
        return (
            <div className="container mx-auto text-center mt-10">
                <p className="text-xl font-semibold">No added classes available. Please check back later.</p>
            </div>
        );
    }

    return (
        <div className="mt-10 lg:mt-5 mb-20">
            <Helmet>
                <title>My Classes | LearnHive</title>
            </Helmet>

            {/* title */}
            <h2 className="text-3xl font-bold text-center mb-8">My Classes</h2>

            {/* classes cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedClasses.map((classItem) => (
                    <div
                        key={classItem._id}
                        className="bg-white shadow-md rounded-lg overflow-hidden border hover:shadow-lg transition flex flex-col"
                    >
                        <img
                            src={classItem.image}
                            alt={classItem.title}
                            className="w-full h-48 md:object-cover"
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

            {/* Pagination */}
            <div className="mt-10 flex flex-col md:flex-row justify-center md:justify-between items-center gap-3">
                <div>
                    <span className="text-gray-800">Page {currentPage + 1} of {Math.ceil(classes.length / itemsPerPage)}</span>
                </div>
                <div>
                    <ReactPaginate
                        previousLabel={
                            <button className="px-3 py-1 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-l-lg">
                                Prev
                            </button>
                        }
                        nextLabel={
                            <button className="px-3 py-1 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-r-lg">
                                Next
                            </button>
                        }
                        pageCount={Math.ceil(classes.length / itemsPerPage)}
                        onPageChange={handlePageChange}
                        containerClassName={"flex justify-center items-center space-x-2"}
                        pageClassName={"px-3 py-1 mx-1 border cursor-pointer rounded-md"}
                        activeClassName={"bg-blue-600 text-white"}
                        disabledClassName={"cursor-not-allowed"}
                        pageLinkClassName="block text-center"
                        previousLinkClassName="block text-center"
                        nextLinkClassName="block text-center"
                    />
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-96 max-h-screen overflow-y-auto p-6 relative">
                        {/* Close Icon */}
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-gray-600 text-xl"
                        >
                            <FaTimes />
                        </button>
                        {/* Form */}
                        <h3 className="text-lg font-semibold mb-4">Update Class Details</h3>
                        <form onSubmit={handleSubmit(handleUpdate)}>
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
                                    Title
                                </label>
                                <input
                                    {...register("title")}
                                    type="text"
                                    id="title"
                                    defaultValue={selectedClass?.title}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    {...register("description")}
                                    id="description"
                                    defaultValue={selectedClass?.description}
                                    className="textarea textarea-bordered w-full"
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="price" className="block text-sm font-semibold text-gray-700">
                                    Price
                                </label>
                                <input
                                    {...register("price")}
                                    type="text"
                                    id="price"
                                    defaultValue={selectedClass?.price}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div className="flex justify-between gap-3">
                                <button
                                    type="submit"
                                    className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white flex-1"
                                >
                                    Update
                                </button>
                                {/* <button
                                    type="button"
                                    onClick={closeModal}
                                    className="btn btn-sm bg-gray-500 hover:bg-gray-600 text-white flex-1"
                                >
                                    Cancel
                                </button> */}
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyClasses;












// reserve code
// updated code
// import { useQuery } from "@tanstack/react-query";
// import { Helmet } from "react-helmet-async";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import useAuth from "../../../hooks/useAuth";
// import { Link, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { useState } from "react";
// import { FaTimes } from "react-icons/fa";

// const MyClasses = () => {
//     const { user } = useAuth();
//     const axiosSecure = useAxiosSecure();
//     const navigate = useNavigate();
//     const [selectedClass, setSelectedClass] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const { register, handleSubmit, reset } = useForm();

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

//     const openModal = (classItem) => {
//         setSelectedClass(classItem);
//         reset(classItem);
//         setIsModalOpen(true);
//     };

//     const closeModal = () => {
//         setSelectedClass(null);
//         setIsModalOpen(false);
//     };

//     // const handleUpdate = (data) => {
//     //     axiosSecure
//     //         .patch(`/classes/${selectedClass._id}`, data)
//     //         .then(() => {
//     //             refetch();
//     //             closeModal();
//     //             Swal.fire({
//     //                 icon: "success",
//     //                 text: "Updated!",
//     //                 title: "The class has been updated.",
//     //                 showConfirmButton: false,
//     //                 timer: 1500
//     //             });
//     //         })
//     //         .catch(() => {
//     //             Swal.fire({
//     //                 icon: "error",
//     //                 text: "Error!",
//     //                 title: "There was an issue updating the class.",
//     //                 showConfirmButton: false,
//     //                 timer: 1500
//     //             });
//     //         });
//     // };

//     const handleUpdate = (data) => {
//         // Check if the data has changed
//         const isDataUnchanged =
//             data.title === selectedClass.title &&
//             data.description === selectedClass.description &&
//             data.price === selectedClass.price;

//         if (isDataUnchanged) {
//             Swal.fire({
//                 icon: "info",
//                 text: "No changes were made.",
//                 title: "Update Skipped",
//                 showConfirmButton: false,
//                 timer: 1500,
//             });
//             return;
//         }

//         // Proceed with the update if data has changed
//         axiosSecure
//             .patch(`/classes/${selectedClass._id}`, data)
//             .then(() => {
//                 refetch();
//                 closeModal();
//                 Swal.fire({
//                     icon: "success",
//                     text: "The class has been updated.",
//                     title: "Updated!",
//                     showConfirmButton: false,
//                     timer: 1500,
//                 });
//             })
//             .catch(() => {
//                 Swal.fire({
//                     icon: "error",
//                     text: "There was an issue updating the class.",
//                     title: "Error!",
//                     showConfirmButton: false,
//                     timer: 1500,
//                 });
//             });
//     };


//     // const handleSeeDetails = (id) => {
//     //     navigate(`/dashboard/my-class/${id}`);
//     // };

//     return (
//         <div className="mt-8">
//             <Helmet>
//                 <title>My Classes || LearnHive</title>
//             </Helmet>
//             <h2 className="text-3xl font-bold text-center mb-8">My Classes</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {classes.map((classItem) => (
//                     <div
//                         key={classItem._id}
//                         className="bg-white shadow-md rounded-lg overflow-hidden border hover:shadow-lg transition flex flex-col"
//                     >
//                         <img
//                             src={classItem.image}
//                             alt={classItem.title}
//                             className="w-full h-48 object-cover"
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
//                                         ? "text-red-500"
//                                         : "text-green-500"
//                                     }`}
//                             >
//                                 Status: {classItem.status.charAt(0).toUpperCase() + classItem.status.slice(1)}
//                             </p>
//                             <div className="mt-auto">
//                                 <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-5 mb-2">
//                                     <button
//                                         className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white flex-1"
//                                         onClick={() => openModal(classItem)}
//                                     >
//                                         Update
//                                     </button>
//                                     <button
//                                         className="btn btn-sm bg-red-500 hover:bg-red-600 text-white flex-1"
//                                         onClick={() => handleDelete(classItem._id)}
//                                     >
//                                         Delete
//                                     </button>
//                                 </div>
//                                 <Link to={classItem.status === "accepted" ? `/dashboard/my-class/${classItem._id}` : "#"}>
//                                     <button
//                                         className={`btn btn-sm ${classItem.status === "accepted"
//                                             ? "bg-green-500 hover:bg-green-600 text-white"
//                                             : "bg-gray-400 text-gray-700 cursor-not-allowed"
//                                             } w-full`}
//                                         disabled={classItem.status !== "accepted"}
//                                     >
//                                         See Details
//                                     </button>
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Modal */}
//             {isModalOpen && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//                     <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-96 max-h-screen overflow-y-auto p-6 relative">
//                         {/* Close Icon */}
//                         <button
//                             onClick={closeModal}
//                             className="absolute top-3 right-3 text-gray-500 hover:text-red-700 focus:outline-none"
//                         >
//                             <FaTimes size={20} />
//                         </button>
//                         <h3 className="text-xl font-bold mb-4">Update Class</h3>
//                         <form onSubmit={handleSubmit(handleUpdate)}>
//                             <div className="mb-4">
//                                 <label className="block text-sm font-medium mb-2">Title</label>
//                                 <input
//                                     {...register("title")}
//                                     className="input input-bordered w-full"
//                                     type="text"
//                                     placeholder="Enter title"
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-sm font-medium mb-2">Description</label>
//                                 <textarea
//                                     {...register("description")}
//                                     className="textarea textarea-bordered w-full"
//                                     placeholder="Enter description"
//                                 ></textarea>
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-sm font-medium mb-2">Price</label>
//                                 <input
//                                     {...register("price")}
//                                     className="input input-bordered w-full"
//                                     type="text"
//                                     placeholder="Enter price"
//                                 />
//                             </div>
//                             <div className="flex justify-end">
//                                 <button type="submit" className="btn btn-primary">
//                                     Update
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MyClasses;
