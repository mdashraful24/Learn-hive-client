import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUsers, FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { Helmet } from "react-helmet-async";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(10);

    // Fetch all users (without pagination parameters)
    const { data: users = [], refetch } = useQuery({
        queryKey: ["users", search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?search=${search}`);
            return res.data;
        }
    });

    // Pagination logic
    const pageCount = Math.ceil(users.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUsers = users.slice(startIndex, endIndex);

    // Calculate "Page X of Y" text
    const currentPageNumber = currentPage + 1;
    const paginationText = `Page ${currentPageNumber} of ${pageCount}`;

    // Handle page change
    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

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

    return (
        <div className="mt-5 mb-10">
            <Helmet>
                <title>Users | LearnHive</title>
            </Helmet>

            <div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-5 mb-5">
                    <h2 className="text-xl md:text-2xl font-extrabold">Total Users: {users.length}</h2>
                    <div className="relative w-full max-w-xs">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name or email"
                            className="input input-bordered w-full pr-10"
                        />
                        <button className="absolute inset-y-0 right-0 px-4">
                            <FaSearch />
                        </button>
                    </div>
                </div>
                {/* Table */}
                <div className="overflow-x-auto rounded-t-lg mt-5">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="bg-blue-600 text-white text-center uppercase">
                                <th className="py-4">#</th>
                                <th className="py-4">Image</th>
                                <th className="py-4">NAME</th>
                                <th className="py-4">EMAIL</th>
                                <th className="py-4">Role</th>
                                <th className="py-4">Make admin</th>
                                <th className="py-4">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((user, index) => (
                                <tr key={user._id} className="text-center hover:bg-base-200">
                                    <td className="py-3 font-bold">{startIndex + index + 1}</td>
                                    <td className="py-3">
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
                                    <td className="py-3">{user.name}</td>
                                    <td className="py-3">{user.email}</td>
                                    <td className="py-3">{user.role}</td>
                                    <td className="py-3">
                                        <button
                                            className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white"
                                            onClick={() => handleMakeAdmin(user)}
                                            disabled={user.role === 'admin'}
                                        >
                                            <FaUsers />
                                        </button>
                                    </td>
                                    <td className="py-3">
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
                <div className="flex flex-col md:flex-row justify-between items-center gap-5 mt-7">
                    {/* Left side: "Page X of Y" */}
                    <div className="text-sm">
                        {paginationText}
                    </div>

                    {/* Right side: Pagination controls */}
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination flex gap-2"}
                        activeClassName={"active bg-blue-500 text-white"}
                        pageClassName={"px-3 py-1 rounded-md"}
                        previousClassName={"px-3 py-1 rounded-md bg-base-300"}
                        nextClassName={"px-3 py-1 rounded-md bg-base-300"}
                        disabledClassName={"opacity-50 cursor-not-allowed"}
                    />
                </div>
            </div>
        </div>
    );
};

export default AllUsers;