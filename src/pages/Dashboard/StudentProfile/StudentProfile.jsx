import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const StudentProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: userInfo, isLoading, error } = useQuery({
        queryKey: ["user", user?.email],
        queryFn: async () => {
            if (user?.email) {
                const res = await axiosSecure.get(`/users/${user.email}`);
                return res.data;
            }
            return null;
        },
        enabled: !!user?.email,
    });

    if (!user) {
        return (
            <div className="container mx-auto">
                <h2 className="text-4xl font-bold text-center mb-5">User Profile</h2>
                <p className="text-center text-gray-600">
                    No user details available. Please log in to view your profile.
                </p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="container mx-auto text-center">
                <p className="text-gray-500">Loading your profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto text-center">
                <p className="text-red-500">Error loading profile. Please try again later.</p>
            </div>
        );
    }

    if (!userInfo) {
        return (
            <div className="container mx-auto text-center">
                <p className="text-gray-500">No profile data found for this user.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto my-10 p-6 bg-gray-50 rounded-xl shadow-lg">
            <div className="flex flex-col items-center text-center">
                <div className="relative w-36 h-36 rounded-full overflow-hidden shadow-lg border-4 border-blue-500">
                    <img
                        src={userInfo.image || "https://via.placeholder.com/150"}
                        alt={userInfo.name || "User"}
                        className="object-cover w-full h-full"
                    />
                </div>
                <h2 className="text-3xl font-bold mt-4">{userInfo.name || "N/A"}</h2>
                <p className="text-gray-600 mt-2 text-lg">{userInfo.role || "N/A"}</p>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Profile Details */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-blue-600 mb-4">Contact Information</h3>
                    <p className="text-gray-700">
                        <span className="font-medium text-gray-900">Email:</span> {userInfo.email || "N/A"}
                    </p>
                    <p className="text-gray-700 mt-2">
                        <span className="font-medium text-gray-900">Phone:</span> {userInfo.phone || "N/A"}
                    </p>
                </div>

                {/* Additional Information */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-blue-600 mb-4">Other Details</h3>
                    <p className="text-gray-700">
                        <span className="font-medium text-gray-900">Joined Date:</span> {userInfo.joinedDate || "N/A"}
                    </p>
                    <p className="text-gray-700 mt-2">
                        <span className="font-medium text-gray-900">Address:</span> {userInfo.address || "N/A"}
                    </p>
                </div>
            </div>

            {/* Button */}
            <div className="mt-8 text-center">
                <button className="px-6 py-3 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition-all">
                    Edit Profile
                </button>
            </div>
        </div>
    );
};

export default StudentProfile;
