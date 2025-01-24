import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const TeacherRequest = () => {
    const axiosSecure = useAxiosSecure();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['teacherRequests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/applications');
            return res.data;
        },
    });

    const handleApprove = (request) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to approve this request?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, approve it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .patch(`/applications/approve/${request._id}`, { status: 'accepted' })
                    .then(async () => {
                        await axiosSecure.patch(`/users/role/${request.userEmail}`, { role: 'teacher' });
                        refetch();
                        Swal.fire({
                            icon: 'success',
                            title: 'Approved!',
                            text: 'The request has been approved and the user is now a teacher.',
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    })
                    .catch(() => {
                        Swal.fire({
                            title: 'Error!',
                            text: 'There was an issue approving the request.',
                            icon: 'error',
                        });
                    });
            }
        });
    };

    const handleReject = (request) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to reject this request?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, reject it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .patch(`/applications/reject/${request._id}`, { status: 'rejected' })
                    .then(() => {
                        refetch();
                        Swal.fire({
                            icon: 'success',
                            title: 'Rejected!',
                            text: 'The request has been rejected.',
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    })
                    .catch(() => {
                        Swal.fire({
                            title: 'Error!',
                            text: 'There was an issue rejecting the request.',
                            icon: 'error',
                        });
                    });
            }
        });
    };

    const filteredData = data?.filter((request) => request.status === 'pending' || request.status === 'rejected');

    const totalRequests = filteredData?.length || 0;
    const totalPages = Math.ceil(totalRequests / itemsPerPage);
    const currentData = filteredData?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    if (isLoading) {
        return (
            <div className="container mx-auto text-center mt-10">
                <p className="text-gray-500">Loading teacher requests...</p>
            </div>
        );
    }

    return (
        <div className="mt-14 lg:mt-5 mb-20">
            <Helmet>
                <title>Teacher Request | LearnHive</title>
            </Helmet>

            <div className="p-5 md:p-8 shadow-lg rounded-lg border">

                {filteredData?.length > 0 ? (
                    <div className="overflow-x-auto rounded-t-xl" id="teacherRequestTable">
                        <h2 className="text-3xl font-bold text-center mb-6">Teacher Requests</h2>
                        <table className="table min-w-full">
                            <thead>
                                <tr className="bg-[#D1A054] text-white text-center uppercase">
                                    <th className="py-5">#</th>
                                    <th className="py-5">Image</th>
                                    <th className="py-5">Name</th>
                                    <th className="py-5">Experience</th>
                                    <th className="py-5">Title</th>
                                    <th className="py-5">Category</th>
                                    <th className="py-5">Status</th>
                                    <th className="py-5">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentData?.map((request, index) => (
                                    <tr key={request._id} className="text-center hover:bg-gray-50 capitalize">
                                        <td className="py-5 font-bold">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                        <td className="py-5">
                                            <img
                                                src={request.image}
                                                alt={request.name}
                                                className="w-12 h-12 rounded-full mx-auto"
                                            />
                                        </td>
                                        <td className="py-5">{request.name}</td>
                                        <td className="py-5">{request.experience}</td>
                                        <td className="py-5">{request.title}</td>
                                        <td className="py-5">{request.category}</td>
                                        <td className="py-5">
                                            <span
                                                className={`text-${request.status === 'pending' ? 'yellow' : 'red'}-600`}
                                            >
                                                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                            </span>
                                        </td>
                                        {/* <td className="py-7 flex justify-center items-center">
                                            {request.status === 'pending' && (
                                                <>
                                                    <button
                                                        className="btn btn-sm bg-green-600 hover:bg-green-700 text-white"
                                                        onClick={() => handleApprove(request)}
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        className="btn btn-sm bg-red-600 hover:bg-red-700 text-white ml-2"
                                                        onClick={() => handleReject(request)}
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                        </td> */}
                                        <td className="py-7 flex justify-center items-center">
                                            {request.status === 'pending' ? (
                                                <>
                                                    <button
                                                        className="btn btn-sm bg-green-600 hover:bg-green-700 text-white"
                                                        onClick={() => handleApprove(request)}
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        className="btn btn-sm bg-red-600 hover:bg-red-700 text-white ml-2"
                                                        onClick={() => handleReject(request)}
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        className="btn btn-sm bg-green-600 text-white opacity-50 cursor-not-allowed"
                                                        disabled
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        className="btn btn-sm bg-red-600 text-white opacity-50 cursor-not-allowed ml-2"
                                                        disabled
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center">
                        <h2 className="text-lg md:text-3xl font-bold">All Teacher Requests Approved!</h2>
                        <p className="mt-2">All requests have been approved, and they are now teachers.</p>
                    </div>
                )}

                {/* Pagination */}
                {totalRequests > 0 && (
                    <div className="mt-8 flex flex-col md:flex-row justify-center md:justify-between items-center gap-3">
                        <div>
                            <span className="text-gray-800">Page {currentPage} of {totalPages}</span>
                        </div>
                        <div className="flex justify-center">
                            <button
                                onClick={() => setCurrentPage(1)}
                                disabled={currentPage === 1}
                                className="px-3 py-1 mx-1 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Prev
                            </button>
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`px-3 py-1 mx-1 rounded ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => setCurrentPage(totalPages)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 mx-1 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeacherRequest;












// reserve code
// import { useQuery } from '@tanstack/react-query';
// import Swal from 'sweetalert2';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import { useState } from 'react';
// import { Helmet } from 'react-helmet-async';

// const TeacherRequest = () => {
//     const axiosSecure = useAxiosSecure();

//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 10;

//     const { data, refetch } = useQuery({
//         queryKey: ['teacherRequests'],
//         queryFn: async () => {
//             const res = await axiosSecure.get('/applications');
//             return res.data;
//         }
//     });

//     const handleApprove = (request) => {
//         Swal.fire({
//             title: 'Are you sure?',
//             text: 'Do you want to approve this request?',
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#3085d6',
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'Yes, approve it!',
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 axiosSecure.patch(`/applications/approve/${request._id}`, { status: 'accepted' })
//                     .then(async () => {
//                         await axiosSecure.patch(`/users/role/${request.userEmail}`, { role: 'teacher' });
//                         refetch();
//                         Swal.fire({
//                             icon: "success",
//                             title: 'Approved!',
//                             text: 'The request has been approved and the user is now a teacher.',
//                             showConfirmButton: false,
//                             timer: 1500
//                         });
//                     })
//                     .catch((error) => {
//                         Swal.fire({
//                             title: 'Error!',
//                             text: 'There was an issue approving the request.',
//                             icon: 'error',
//                         });
//                     });
//             }
//         });
//     };

//     const handleReject = (request) => {
//         Swal.fire({
//             title: 'Are you sure?',
//             text: 'Do you want to reject this request?',
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#d33',
//             cancelButtonColor: '#3085d6',
//             confirmButtonText: 'Yes, reject it!',
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 axiosSecure.patch(`/applications/reject/${request._id}`, { status: 'rejected' })
//                     .then(() => {
//                         refetch();
//                         Swal.fire({
//                             icon: "success",
//                             title: 'Rejected!',
//                             text: 'The request has been rejected.',
//                             showConfirmButton: false,
//                             timer: 1500
//                         });
//                     })
//                     .catch((error) => {
//                         Swal.fire({
//                             title: 'Error!',
//                             text: 'There was an issue rejecting the request.',
//                             icon: 'error',
//                         });
//                     });
//             }
//         });
//     };

//     const handleRequestAgain = (request) => {
//         axiosSecure.patch(`/applications/request-again/${request._id}`, { status: 'pending' })
//             .then(() => {
//                 refetch();
//                 Swal.fire(
//                     'Request accepted!',
//                     'The request status has been set to pending again.',
//                     'success'
//                 );
//             })
//             .catch((error) => {
//                 Swal.fire({
//                     title: 'Error!',
//                     text: 'There was an issue setting the request status to pending.',
//                     icon: 'error',
//                 });
//             });
//     };

//     const allRequestsApproved = data?.every((request) => request.status === 'accepted');

//     // Calculate pagination data
//     const totalRequests = data?.length || 0;
//     const totalPages = Math.ceil(totalRequests / itemsPerPage);
//     const currentData = data?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//     return (
//         <div className="mt-10 lg:mt-5 mb-20">
//             <Helmet>
//                 <title>Teacher Request | LearnHive</title>
//             </Helmet>

//             {/* Show message if all requests are approved */}
//             {allRequestsApproved ? (
//                 <div className="text-center">
//                     <h2 className="text-3xl font-bold">All Teacher Requests Approved!</h2>
//                     <p className="mt-2">All requests have been approved, and they are now teachers.</p>
//                 </div>
//             ) : (
//                 <div className="p-5 md:p-8 shadow-lg rounded-lg border">
//                     <h2 className="text-3xl font-bold text-center mb-6">Teacher Requests</h2>

//                     <div className="overflow-x-auto rounded-t-xl mt-5" id="teacherRequestTable">
//                         <table className="table min-w-full">
//                             {/* Table Head */}
//                             <thead>
//                                 <tr className="bg-[#D1A054] text-white text-center uppercase">
//                                     <th className="py-5">#</th>
//                                     <th className="py-5">Image</th>
//                                     <th className="py-5">Name</th>
//                                     <th className="py-5">Experience</th>
//                                     <th className="py-5">Title</th>
//                                     <th className="py-5">Category</th>
//                                     <th className="py-5">Status</th>
//                                     <th className="py-5">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {currentData?.map((request, index) => (
//                                     <tr key={request._id} className="text-center hover:bg-gray-50 capitalize">
//                                         <td className="py-5 font-bold">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
//                                         <td className="py-5">
//                                             <img src={request.image} alt={request.name} className="w-12 h-12 rounded-full mx-auto" />
//                                         </td>
//                                         <td className="py-5">{request.name}</td>
//                                         <td className="py-5">{request.experience}</td>
//                                         <td className="py-5">{request.title}</td>
//                                         <td className="py-5">{request.category}</td>
//                                         <td className="py-5">
//                                             <span
//                                                 className={`text-${request.status === 'pending' ? 'yellow' : request.status === 'accepted' ? 'green' : 'red'}-600`}
//                                             >
//                                                 {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
//                                             </span>
//                                         </td>
//                                         <td className="py-7 flex justify-center items-center">
//                                             {request.status === 'pending' ? (
//                                                 <>
//                                                     <button
//                                                         className="btn btn-sm bg-green-600 hover:bg-green-700 text-white"
//                                                         onClick={() => handleApprove(request)}
//                                                     >
//                                                         Approve
//                                                     </button>
//                                                     <button
//                                                         className="btn btn-sm bg-red-600 hover:bg-red-700 text-white ml-2"
//                                                         onClick={() => handleReject(request)}
//                                                     >
//                                                         Reject
//                                                     </button>
//                                                 </>
//                                             ) : request.status === 'accepted' ? (
//                                                 <button
//                                                     className="btn btn-sm bg-gray-400 cursor-not-allowed"
//                                                     disabled
//                                                 >
//                                                     Approved
//                                                 </button>
//                                             ) : (
//                                                 <button
//                                                     className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white"
//                                                     onClick={() => handleRequestAgain(request)}
//                                                 >
//                                                     Request Again
//                                                 </button>
//                                             )}
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>

//                     {/* Pagination */}
//                         <div className="mt-8 flex flex-col md:flex-row justify-center md:justify-between items-center gap-3">
//                         <div>
//                             <span className="text-gray-800">Page {currentPage} of {totalPages}</span>
//                         </div>
//                         <div className="flex justify-center">
//                             <button
//                                 onClick={() => setCurrentPage(1)}
//                                 disabled={currentPage === 1}
//                                 className="px-3 py-1 mx-1 bg-gray-300 rounded hover:bg-gray-400"
//                             >
//                                 Prev
//                             </button>
//                             {[...Array(totalPages)].map((_, index) => (
//                                 <button
//                                     key={index}
//                                     onClick={() => setCurrentPage(index + 1)}
//                                     className={`px-3 py-1 mx-1 rounded ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
//                                 >
//                                     {index + 1}
//                                 </button>
//                             ))}
//                             <button
//                                 onClick={() => setCurrentPage(totalPages)}
//                                 disabled={currentPage === totalPages}
//                                     className="px-3 py-1 mx-1 bg-gray-300 rounded hover:bg-gray-400"
//                             >
//                                 Next
//                             </button>
//                         </div>
//                     </div>

//                 </div>
//             )}
//         </div>
//     );
// };

// export default TeacherRequest;
