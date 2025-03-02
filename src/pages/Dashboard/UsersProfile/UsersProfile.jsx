import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const UsersProfile = () => {
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 12;

    // Fetch all users
    const { data: users = [], isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data;
        }
    });

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    // Paginate users (only slice the data)
    const paginatedUsers = users.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    if (isLoading) {
        return (
            <div className="container mx-auto text-center mt-10">
                <p className="">Loading users profile...</p>
            </div>
        );
    }

    return (
        <div className="mt-5 mb-10">
            <Helmet>
                <title>Profile | LearnHive</title>
            </Helmet>

            {/* title */}
            <h2 className="text-2xl md:text-4xl font-extrabold text-center mb-4">Users Profile</h2>

            {/* card start */}
            <div className="rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {paginatedUsers.map(user => (
                        <div key={user._id} className="bg-base-200 p-6 rounded-lg shadow-md">
                            <div className="flex justify-center mb-4">
                                <div>
                                    <img src={user.image} alt={user.name} className="w-24 h-24 object-cover rounded-full border-2 shadow-lg" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-center mb-2">{user.name}</h3>
                            <p className="text-center mb-2"><span className="">Email:</span> {user.email}</p>
                            <p className="text-center mb-2"><span className="">Phone:</span> {user.phone ? user.phone : "N/A"}</p>
                            <p className="text-center capitalize mb-2"><span className="">Role:</span> {user.role}</p>
                            <p className="text-center capitalize mb-2">
                                <span className="">
                                    {user.role === "admin"
                                        ? "Admin creation:"
                                        : user.role === "teacher"
                                            ? "Joined:"
                                            : user.role === "student"
                                                ? "Registration:"
                                                : "Date:"}
                                </span>{" "}
                                {user.joinedDate ? new Date(user.joinedDate).toLocaleDateString() : "N/A"}
                            </p>

                        </div>
                    ))}
                </div>
                
                {/* Pagination */}
                <div className="mt-10 flex flex-col md:flex-row justify-center md:justify-between items-center gap-3">
                    <div>
                        <span className="">Page {currentPage + 1} of {Math.ceil(users.length / itemsPerPage)}</span>
                    </div>
                    <div>
                        <ReactPaginate
                            previousLabel={
                                <button className="px-3 py-1 bg-base-300 hover:bg-base-300 rounded-l-lg">
                                    Prev
                                </button>
                            }
                            nextLabel={
                                <button className="px-3 py-1 bg-base-300 hover:bg-base-300 rounded-r-lg">
                                    Next
                                </button>
                            }
                            pageCount={Math.ceil(users.length / itemsPerPage)}
                            onPageChange={handlePageChange}
                            containerClassName={"flex justify-center items-center space-x-2"}
                            pageClassName={"px-3 py-1 mx-1 border cursor-pointer rounded-lg"}
                            activeClassName={"bg-blue-600 text-white"}
                            disabledClassName={"cursor-not-allowed"}
                            pageLinkClassName="block text-center"
                            previousLinkClassName="block text-center"
                            nextLinkClassName="block text-center"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsersProfile;
