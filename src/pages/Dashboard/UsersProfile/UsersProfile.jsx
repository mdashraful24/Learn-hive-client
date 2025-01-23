import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const UsersProfile = () => {
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

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
                <p className="text-gray-500">Loading users profile...</p>
            </div>
        );
    }

    return (
        <div className="mt-10 lg:mt-5 mb-16">
            <Helmet>
                <title>Profile | LearnHive</title>
            </Helmet>

            {/* title */}
            <h2 className="text-3xl font-bold text-center">Users Profile</h2>

            {/* card start */}
            <div className="bg-white shadow-md rounded-lg p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedUsers.map(user => (
                        <div key={user._id} className="bg-gray-100 p-6 rounded-lg shadow-md">
                            <div className="flex justify-center mb-4">
                                <div>
                                    <img src={user.image} alt={user.name} className="w-24 h-24 object-cover rounded-full border-2 shadow-lg" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-center mb-2">{user.name}</h3>
                            <p className="text-center text-gray-600 mb-2"><span className="text-gray-900">Email:</span> {user.email}</p>
                            <p className="text-center text-gray-600 mb-2"><span className="text-gray-900">Phone:</span> {user.phone ? user.phone : "N/A"}</p>
                            <p className="text-center text-gray-600 capitalize mb-2"><span className="text-gray-900">Role:</span> {user.role}</p>
                            <p className="text-center text-gray-600 capitalize mb-2"><span className="text-gray-900">Joined:</span> {user.joinedDate ? new Date(user.joinedDate).toLocaleDateString() : "N/A"}</p>
                        </div>
                    ))}
                </div>
                
                {/* Pagination */}
                <div className="mt-10 flex flex-col md:flex-row justify-center md:justify-between items-center gap-3">
                    <div>
                        <span className="text-gray-800">Page {currentPage + 1} of {Math.ceil(users.length / itemsPerPage)}</span>
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
