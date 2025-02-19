import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const MyRequest = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['teacherRequests', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/applications/${user.email}`);
            return res.data;
        },
    });

    const handleRequestAgain = (request) => {
        axiosSecure
            .patch(`/applications/request-again/${request._id}`, { status: 'pending' })
            .then(() => {
                refetch();
                Swal.fire(
                    'Request Accepted!',
                    'The request status has been set to pending again.',
                    'success'
                );
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an issue setting the request status to pending.',
                    icon: 'error',
                });
            });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-lg animate-pulse">Loading application request...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-10">
            <Helmet>
                <title>My Request | LearnHive</title>
            </Helmet>

            <div className="max-w-4xl mx-auto p-6 md:p-10 shadow-xl rounded-lg border">
                <h2 className="text-2xl md:text-4xl font-extrabold text-center mb-10">Job Application Details</h2>

                {data ? (
                    <>
                        <div className="flex justify-center mb-8">
                            <div className='p-5'>
                                <img
                                    src={data.image}
                                    alt={`${data.name}'s profile`}
                                    className="w-24 h-24 md:w-32 md:h-32 rounded-full shadow-lg object-cover"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="shadow-md rounded-lg p-5 hover:shadow-lg transition-shadow duration-300">
                                <h3 className="text-lg font-semibold mb-2">Name</h3>
                                <p className="capitalize">{data.name}</p>
                            </div>
                            <div className="shadow-md rounded-lg p-5 hover:shadow-lg transition-shadow duration-300">
                                <h3 className="text-lg font-semibold mb-2">Email</h3>
                                <p className="">{data.userEmail}</p>
                            </div>
                            <div className="shadow-md rounded-lg p-5 hover:shadow-lg transition-shadow duration-300">
                                <h3 className="text-lg font-semibold mb-2">Experience</h3>
                                <p className="capitalize">{data.experience}</p>
                            </div>
                            <div className="shadow-md rounded-lg p-5 hover:shadow-lg transition-shadow duration-300">
                                <h3 className="text-lg font-semibold mb-2">Title</h3>
                                <p className="capitalize">{data.title}</p>
                            </div>
                            <div className="shadow-md rounded-lg p-5 hover:shadow-lg transition-shadow duration-300">
                                <h3 className="text-lg font-semibold mb-2">Category</h3>
                                <p className="capitalize">{data.category}</p>
                            </div>
                            <div className="shadow-md rounded-lg p-5 hover:shadow-lg transition-shadow duration-300">
                                <h3 className="text-lg font-semibold mb-2">Status</h3>
                                <p
                                    className={`text-sm font-medium px-4 py-2 rounded-full inline-block ${data.status === 'approved'
                                        ? 'bg-green-100 text-green-600'
                                        : data.status === 'pending'
                                            ? 'bg-blue-100 text-blue-600'
                                            : 'bg-red-100 text-red-600'
                                        }`}
                                >
                                    {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
                                </p>
                            </div>
                        </div>
                        <div className="mt-10">
                            {data.status === 'pending' && (
                                <>
                                    <p>
                                        <strong className='text-red-600'>Note:</strong> If the admin rejects this request, the "Request to Another" button appears here.
                                    </p>
                                </>
                            )}
                        </div>
                        <div className="mt-10 text-center">
                            {data.status === 'rejected' && (
                                <>
                                    <button
                                        onClick={() => handleRequestAgain(data)}
                                        className="btn bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-300"
                                    >
                                        Request to Another
                                    </button>
                                    <p className="mt-4 text-md">
                                        <strong className='text-red-600'>Note:</strong> Your previous application was rejected. You can request another review by clicking the button above.
                                    </p>
                                </>
                            )}
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

export default MyRequest;











// reserve code
// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import { Helmet } from 'react-helmet-async';
// import useAuth from '../../../hooks/useAuth';

// const MyRequest = () => {
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
//                 <h2 className="text-4xl font-bold text-center mb-10">Job Application Details</h2>

//                 {data ? (
//                     <>
//                         {/* image */}
//                         <div className="flex justify-center mb-8">
//                             <img
//                                 src={data.image}
//                                 alt={`${data.name}'s profile`}
//                                 className="w-24 h-24 md:w-32 md:h-32 rounded-full shadow-lg object-cover"
//                             />
//                         </div>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             {/* Name */}
//                             <div className="bg-gradient-to-r from-indigo-50 to-white shadow-md rounded-lg p-5 hover:shadow-lg transition-shadow duration-300">
//                                 <h3 className="text-lg font-semibold mb-2">Name</h3>
//                                 <p className="text-gray-700 capitalize">{data.name}</p>
//                             </div>
//                             {/* Email */}
//                             <div className="bg-gradient-to-r from-indigo-50 to-white shadow-md rounded-lg p-5 hover:shadow-lg transition-shadow duration-300">
//                                 <h3 className="text-lg font-semibold mb-2">Email</h3>
//                                 <p className="text-gray-700">{data.userEmail}</p>
//                             </div>
//                             {/* Experience */}
//                             <div className="bg-gradient-to-r from-indigo-50 to-white shadow-md rounded-lg p-5 hover:shadow-lg transition-shadow duration-300">
//                                 <h3 className="text-lg font-semibold mb-2">Experience</h3>
//                                 <p className="text-gray-700 capitalize">{data.experience}</p>
//                             </div>
//                             {/* Title */}
//                             <div className="bg-gradient-to-r from-indigo-50 to-white shadow-md rounded-lg p-5 hover:shadow-lg transition-shadow duration-300">
//                                 <h3 className="text-lg font-semibold mb-2">Title</h3>
//                                 <p className="text-gray-700 capitalize">{data.title}</p>
//                             </div>
//                             {/* Category */}
//                             <div className="bg-gradient-to-r from-indigo-50 to-white shadow-md rounded-lg p-5 hover:shadow-lg transition-shadow duration-300">
//                                 <h3 className="text-lg font-semibold mb-2">Category</h3>
//                                 <p className="text-gray-700 capitalize">{data.category}</p>
//                             </div>
//                             {/* Status */}
//                             <div className="bg-gradient-to-r from-indigo-50 to-white shadow-md rounded-lg p-5 hover:shadow-lg transition-shadow duration-300">
//                                 <h3 className="text-lg font-semibold mb-2">Status</h3>
//                                 <p
//                                     className={`text-sm font-medium px-4 py-2 rounded-full inline-block ${data.status === 'approved'
//                                         ? 'bg-green-100 text-green-600'
//                                         : data.status === 'pending'
//                                             ? 'bg-blue-100 text-blue-600'
//                                             : 'bg-red-100 text-red-600'
//                                         }`}
//                                 >
//                                     {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
//                                 </p>
//                             </div>
//                         </div>
//                     </>
//                 ) : (
//                     <div className="text-center">
//                         <p className="text-lg text-gray-600">No job application data found.</p>
//                         {/* <small>Because you are still a student, let's finish studying and then apply for a job.</small> */}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default MyRequest;

