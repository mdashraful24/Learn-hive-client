// Without pagination
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// const UsersProfile = () => {
//     const axiosSecure = useAxiosSecure();

//     const { data: users = [] } = useQuery({
//         queryKey: ['users'],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/users`);
//             return res.data;
//         }
//     });

//     return (
//         <div className="mt-10 md:mt-14 mb-16">
//             <h2 className="text-4xl font-bold text-center mb-5">Users Profile</h2>
//             <div className="bg-white shadow-md rounded-lg p-8">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {users.map(user => (
//                         <div key={user._id} className="bg-gray-100 p-6 rounded-lg shadow-md">
//                             <div className="flex justify-center mb-4">
//                                 <div className="h-24 w-24 rounded-full overflow-hidden">
//                                     <img src={user.image} alt={user.name} />
//                                 </div>
//                             </div>
//                             <h3 className="text-xl font-bold text-center mb-2">{user.name}</h3>
//                             <p className="text-center text-gray-600 mb-2"><span className="text-gray-900">Email:</span> {user.email}</p>
//                             <p className="text-center text-gray-600 mb-2"><span className="text-gray-900">Phone:</span> {user.phone}</p>
//                             <p className="text-center text-gray-600 capitalize mb-2"><span className="text-gray-900">Role:</span> {user.role}</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UsersProfile;






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
    const { data: users = [] } = useQuery({
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

export default UsersProfile;
