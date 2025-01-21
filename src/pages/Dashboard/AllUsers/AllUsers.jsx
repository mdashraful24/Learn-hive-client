// Without pagination
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { FaTrashAlt, FaUsers, FaSearch } from "react-icons/fa";
// import Swal from "sweetalert2";
// import { useState } from "react";

// const AllUsers = () => {
//     const axiosSecure = useAxiosSecure();
//     const [search, setSearch] = useState("");

//     const { data: users = [], refetch } = useQuery({
//         queryKey: ['users', search],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/users?search=${search}`);
//             return res.data;
//         }
//     });

//     const handleMakeAdmin = user => {
//         axiosSecure.patch(`/users/admin/${user._id}`)
//             .then(res => {
//                 if (res.data.modifiedCount > 0) {
//                     refetch();
//                     Swal.fire({
//                         icon: "success",
//                         title: `${user.name} is an Admin Now!`,
//                         showConfirmButton: false,
//                         timer: 1500
//                     });
//                 }
//             });
//     };

//     const handleDeleteUser = user => {
//         Swal.fire({
//             title: "Are you sure?",
//             text: "You won't be able to revert this!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Yes, delete it!"
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 axiosSecure.delete(`/users/${user._id}`)
//                     .then(res => {
//                         if (res.data.deletedCount > 0) {
//                             refetch();
//                             Swal.fire({
//                                 title: "Deleted!",
//                                 text: "User has been deleted.",
//                                 icon: "success"
//                             });
//                         }
//                     });
//             }
//         });
//     };

//     return (
//         <div className="mt-10 md:mt-14 mb-16">
//             <div className="p-5 md:p-8 shadow-lg rounded-lg border">
//                 <div className="flex justify-between items-center mb-5">
//                     <h2 className="text-3xl font-bold">Total users: {users.length}</h2>
//                     <div className="relative w-full max-w-xs">
//                         <input
//                             type="text"
//                             value={search}
//                             onChange={(e) => setSearch(e.target.value)}
//                             placeholder="Search by name or email"
//                             className="input input-bordered w-full pr-10"
//                         />
//                         <button className="absolute inset-y-0 right-0 px-4 text-gray-500">
//                             <FaSearch />
//                         </button>
//                     </div>
//                 </div>
//                 {/* Table */}
//                 <div className="overflow-x-auto rounded-t-xl mt-5">
//                     <table className="table">
//                         {/* head */}
//                         <thead>
//                             <tr className="bg-[#D1A054] text-white text-center uppercase">
//                                 <th className="py-5">#</th>
//                                 <th className="py-5">Image</th>
//                                 <th className="py-5">NAME</th>
//                                 <th className="py-5">EMAIL</th>
//                                 <th className="py-5">Make admin</th>
//                                 <th className="py-5">ACTION</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {users.map((user, index) => (
//                                 <tr key={user._id} className="text-center hover:bg-gray-50">
//                                     <td className="py-5 font-bold">{index + 1}</td>
//                                     <td className="py-5">
//                                         <div className="flex justify-center items-center gap-3">
//                                             <div className="avatar">
//                                                 <div className="h-12 w-12">
//                                                     <img
//                                                         src={user.image}
//                                                         alt={user.name} />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </td>
//                                     <td className="py-5">{user.name}</td>
//                                     <td className="py-5">{user.email}</td>
//                                     <td className="py-5">
//                                         <button
//                                             className="btn btn-sm bg-[#D1A054] hover:bg-[#D1A054] text-white"
//                                             onClick={() => handleMakeAdmin(user)}
//                                             disabled={user.role === 'admin'}
//                                         >
//                                             <FaUsers />
//                                         </button>
//                                     </td>
//                                     <td className="py-5">
//                                         <button
//                                             className="btn btn-sm bg-red-600 hover:bg-red-700 text-white"
//                                             onClick={() => handleDeleteUser(user)}
//                                         >
//                                             <FaTrashAlt />
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AllUsers;











import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUsers, FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";
import ReactPaginate from "react-paginate";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10; // Number of items per page

    // Fetch users with search and pagination
    const { data: users = [], refetch } = useQuery({
        queryKey: ["users", search, currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?search=${search}&page=${currentPage + 1}&limit=${itemsPerPage}`);
            return res.data;
        }
    });

    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        icon: "success",
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };

    const handleDeleteUser = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been deleted.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    return (
        <div className="mt-10 md:mt-14 mb-16">
            <div className="p-5 md:p-8 shadow-lg rounded-lg border">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-3xl font-bold">Total users: {users.length}</h2>
                    <div className="relative w-full max-w-xs">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name or email"
                            className="input input-bordered w-full pr-10"
                        />
                        <button className="absolute inset-y-0 right-0 px-4 text-gray-500">
                            <FaSearch />
                        </button>
                    </div>
                </div>
                {/* Table */}
                <div className="overflow-x-auto rounded-t-xl mt-5">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="bg-[#D1A054] text-white text-center uppercase">
                                <th className="py-5">#</th>
                                <th className="py-5">Image</th>
                                <th className="py-5">NAME</th>
                                <th className="py-5">EMAIL</th>
                                <th className="py-5">Make admin</th>
                                <th className="py-5">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id} className="text-center hover:bg-gray-50">
                                    <td className="py-5 font-bold">{index + 1 + currentPage * itemsPerPage}</td>
                                    <td className="py-5">
                                        <div className="flex justify-center items-center gap-3">
                                            <div className="avatar">
                                                <div className="h-12 w-12">
                                                    <img
                                                        src={user.image}
                                                        alt={user.name} />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-5">{user.name}</td>
                                    <td className="py-5">{user.email}</td>
                                    <td className="py-5">
                                        <button
                                            className="btn btn-sm bg-[#D1A054] hover:bg-[#D1A054] text-white"
                                            onClick={() => handleMakeAdmin(user)}
                                            disabled={user.role === 'admin'}
                                        >
                                            <FaUsers />
                                        </button>
                                    </td>
                                    <td className="py-5">
                                        <button
                                            className="btn btn-sm bg-red-600 hover:bg-red-700 text-white"
                                            onClick={() => handleDeleteUser(user)}
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <ReactPaginate
                    previousLabel={
                        <button className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-l-lg">
                            Previous
                        </button>
                    }
                    nextLabel={
                        <button className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-r-lg">
                            Next
                        </button>
                    }
                    pageCount={Math.ceil(users.length / itemsPerPage)}
                    onPageChange={handlePageChange}
                    containerClassName={"flex justify-center items-center mt-6 space-x-2"}
                    pageClassName={"px-4 py-2 mx-1 border cursor-pointer rounded-lg"}
                    activeClassName={"bg-blue-600 text-white"}
                    disabledClassName={"cursor-not-allowed"}
                    pageLinkClassName="block text-center"
                    previousLinkClassName="block text-center"
                    nextLinkClassName="block text-center"
                />
            </div>
        </div>
    );
};

export default AllUsers;
















// 

// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { FaTrashAlt, FaUsers } from "react-icons/fa";
// import Swal from "sweetalert2";
// import { useState } from "react";

// const AllUsers = () => {
//     const axiosSecure = useAxiosSecure();
//     const [search, setSearch] = useState("");

//     const { data: users = [], refetch } = useQuery({
//         queryKey: ['users', search],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/users?search=${search}`);
//             return res.data;
//         }
//     });

//     const handleMakeAdmin = user => {
//         axiosSecure.patch(`/users/admin/${user._id}`)
//             .then(res => {
//                 if (res.data.modifiedCount > 0) {
//                     refetch();
//                     Swal.fire({
//                         icon: "success",
//                         title: `${user.name} is an Admin Now!`,
//                         showConfirmButton: false,
//                         timer: 1500
//                     });
//                 }
//             });
//     };

//     const handleDeleteUser = user => {
//         Swal.fire({
//             title: "Are you sure?",
//             text: "You won't be able to revert this!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Yes, delete it!"
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 axiosSecure.delete(`/users/${user._id}`)
//                     .then(res => {
//                         if (res.data.deletedCount > 0) {
//                             refetch();
//                             Swal.fire({
//                                 title: "Deleted!",
//                                 text: "User has been deleted.",
//                                 icon: "success"
//                             });
//                         }
//                     });
//             }
//         });
//     };

//     return (
//         <div className="mb-16">
//             <div className="bg-white px-8 py-5">
//                 <div className="flex justify-between items-center mb-5">
//                     <h2 className="text-3xl font-bold">Total users: {users.length}</h2>
//                     <input
//                         type="text"
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                         placeholder="Search by name or email"
//                         className="input input-bordered"
//                     />
//                 </div>
//                 {/* Table */}
//                 <div className="overflow-x-auto rounded-t-xl mt-5">
//                     <table className="table">
//                         {/* head */}
//                         <thead>
//                             <tr className="bg-[#D1A054] text-white text-center uppercase">
//                                 <th className="py-5">#</th>
//                                 <th className="py-5">Image</th>
//                                 <th className="py-5">NAME</th>
//                                 <th className="py-5">EMAIL</th>
//                                 <th className="py-5">Make admin</th>
//                                 <th className="py-5">ACTION</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {users.map((user, index) => (
//                                 <tr key={user._id} className="text-center hover:bg-gray-50">
//                                     <td className="py-5 font-bold">{index + 1}</td>
//                                     <td className="py-5">
//                                         <div className="flex justify-center items-center gap-3">
//                                             <div className="avatar">
//                                                 <div className="h-12 w-12">
//                                                     <img
//                                                         src={user.image}
//                                                         alt={user.name} />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </td>
//                                     <td className="py-5">{user.name}</td>
//                                     <td className="py-5">{user.email}</td>
//                                     <td className="py-5">
//                                         <button
//                                             className="btn btn-sm bg-[#D1A054] hover:bg-[#D1A054] text-white"
//                                             onClick={() => handleMakeAdmin(user)}
//                                             disabled={user.role === 'admin'}
//                                         >
//                                             <FaUsers />
//                                         </button>
//                                     </td>
//                                     <td className="py-5">
//                                         <button
//                                             className="btn btn-sm bg-red-600 hover:bg-red-700 text-white"
//                                             onClick={() => handleDeleteUser(user)}
//                                         >
//                                             <FaTrashAlt />
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AllUsers;
