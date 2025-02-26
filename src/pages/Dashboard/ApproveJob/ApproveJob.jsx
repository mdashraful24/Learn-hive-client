import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../../hooks/useAuth';

const ApproveJob = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data, isLoading } = useQuery({
        queryKey: ['teacherRequests', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/applications/${user.email}`);
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-lg animate-pulse">Loading application request...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-14">
            <Helmet>
                <title>My Request | LearnHive</title>
            </Helmet>

            <div className="max-w-4xl mx-auto p-6 md:p-10 shadow-xl rounded-lg border">
                <h2 className="text-2xl md:text-4xl font-bold text-center mb-10">Job Application Details</h2>

                {data ? (
                    <>
                        {/* image */}
                        <div className="flex justify-center mb-8">
                            <img
                                src={data.image}
                                alt={`${data.name}'s profile`}
                                className="w-24 h-24 md:w-32 md:h-32 rounded-full shadow-lg object-cover"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div className="shadow-md rounded-lg p-5 hover:shadow-lg transition-shadow duration-300">
                                <h3 className="text-lg font-semibold mb-2">Name</h3>
                                <p className="capitalize">{data.name}</p>
                            </div>
                            {/* Email */}
                            <div className="shadow-md rounded-lg p-5 hover:shadow-lg transition-shadow duration-300">
                                <h3 className="text-lg font-semibold mb-2">Email</h3>
                                <p className="">{data.userEmail}</p>
                            </div>
                            {/* Experience */}
                            <div className="shadow-md rounded-lg p-5 hover:shadow-lg transition-shadow duration-300">
                                <h3 className="text-lg font-semibold mb-2">Experience</h3>
                                <p className=" capitalize">{data.experience}</p>
                            </div>
                            {/* Title */}
                            <div className="shadow-md rounded-lg p-5 hover:shadow-lg transition-shadow duration-300">
                                <h3 className="text-lg font-semibold mb-2">Title</h3>
                                <p className=" capitalize">{data.title}</p>
                            </div>
                            {/* Category */}
                            <div className="shadow-md rounded-lg p-5 hover:shadow-lg transition-shadow duration-300">
                                <h3 className="text-lg font-semibold mb-2">Category</h3>
                                <p className=" capitalize">{data.category}</p>
                            </div>
                            {/* Status */}
                            <div className="shadow-md rounded-lg p-5 hover:shadow-lg transition-shadow duration-300">
                                <h3 className="text-lg font-semibold mb-2">Status</h3>
                                <p
                                    className={`text-sm font-medium px-4 py-2 rounded-full inline-block ${data.status === 'approved' || data.status === 'accepted'
                                        ? 'bg-green-100 text-green-600'
                                        : data.status === 'pending'
                                            ? 'bg-yellow-100 text-yellow-600'
                                            : 'bg-red-100 text-red-600'
                                        }`}
                                >
                                    {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
                                </p>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center">
                        <p className="text-lg">No job application data found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ApproveJob;










// reserve code
// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import { Helmet } from 'react-helmet-async';
// import useAuth from '../../../hooks/useAuth';

// const ApproveJob = () => {
//     const { user } = useAuth();
//     const axiosSecure = useAxiosSecure();

//     const { data, isLoading } = useQuery({
//         queryKey: ['teacherRequests', user?.email],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/applications/${user.email}`);
//             return res.data;
//         },
//     });

//     if (isLoading) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <p className="text-lg text-gray-600 animate-pulse">Loading application request...</p>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen py-14">
//             <Helmet>
//                 <title>My Request | LearnHive</title>
//             </Helmet>

//             <div className="max-w-4xl mx-auto p-6 md:p-10 shadow-xl rounded-lg bg-white border border-gray-200">
//                 <h2 className="text-2xl md:text-4xl font-bold text-center mb-10">Job Application Details</h2>
                
//                 {/* image */}
//                 <div className="flex justify-center mb-8">
//                     <img
//                         src={data.image}
//                         alt={`${data.name}'s profile`}
//                         className="w-24 h-24 md:w-32 md:h-32 rounded-full shadow-lg object-cover"
//                     />
//                 </div>
                
//                 {data ? (
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         {/* Name */}
//                         <div className="bg-gradient-to-r from-indigo-50 to-white shadow-md rounded-lg p-5 hover:shadow-lg transition-shadow duration-300">
//                             <h3 className="text-lg font-semibold mb-2">Name</h3>
//                             <p className="text-gray-700 capitalize">{data.name}</p>
//                         </div>
//                         {/* Email */}
//                         <div className="bg-gradient-to-r from-indigo-50 to-white shadow-md rounded-lg p-5 hover:shadow-lg transition-shadow duration-300">
//                             <h3 className="text-lg font-semibold mb-2">Email</h3>
//                             <p className="text-gray-700">{data.userEmail}</p>
//                         </div>
//                         {/* Experience */}
//                         <div className="bg-gradient-to-r from-indigo-50 to-white shadow-md rounded-lg p-5 hover:shadow-lg transition-shadow duration-300">
//                             <h3 className="text-lg font-semibold mb-2">Experience</h3>
//                             <p className="text-gray-700 capitalize">{data.experience}</p>
//                         </div>
//                         {/* Title */}
//                         <div className="bg-gradient-to-r from-indigo-50 to-white shadow-md rounded-lg p-5 hover:shadow-lg transition-shadow duration-300">
//                             <h3 className="text-lg font-semibold mb-2">Title</h3>
//                             <p className="text-gray-700 capitalize">{data.title}</p>
//                         </div>
//                         {/* Category */}
//                         <div className="bg-gradient-to-r from-indigo-50 to-white shadow-md rounded-lg p-5 hover:shadow-lg transition-shadow duration-300">
//                             <h3 className="text-lg font-semibold mb-2">Category</h3>
//                             <p className="text-gray-700 capitalize">{data.category}</p>
//                         </div>
//                         {/* Status */}
//                         <div className="bg-gradient-to-r from-indigo-50 to-white shadow-md rounded-lg p-5 hover:shadow-lg transition-shadow duration-300">
//                             <h3 className="text-lg font-semibold mb-2">Status</h3>
//                             <p
//                                 className={`text-sm font-medium px-4 py-2 rounded-full inline-block ${data.status === 'approved' || data.status === 'accepted'
//                                     ? 'bg-green-100 text-green-600'
//                                     : data.status === 'pending'
//                                         ? 'bg-yellow-100 text-yellow-600'
//                                         : 'bg-red-100 text-red-600'
//                                     }`}
//                             >
//                                 {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
//                             </p>
//                         </div>
//                     </div>
//                 ) : (
//                     <div className="text-center">
//                         <p className="text-lg text-gray-600">No data available.</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ApproveJob;
