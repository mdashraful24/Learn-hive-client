import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UsersProfile = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data;
        }
    });

    return (
        <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-5">Users Profile</h2>
            <div className="bg-white shadow-md rounded-lg p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {users.map(user => (
                        <div key={user._id} className="bg-gray-100 p-6 rounded-lg shadow-md">
                            <div className="flex justify-center mb-4">
                                <div className="h-24 w-24 rounded-full overflow-hidden">
                                    <img src={user.image} alt={user.name} />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-center mb-2">{user.name}</h3>
                            <p className="text-center text-gray-600 mb-2"><span className="text-gray-900">Email:</span> {user.email}</p>
                            <p className="text-center text-gray-600 mb-2"><span className="text-gray-900">Phone:</span> {user.phone}</p>
                            <p className="text-center text-gray-600 capitalize mb-2"><span className="text-gray-900">Role:</span> {user.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UsersProfile;
