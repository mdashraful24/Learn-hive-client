import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const TeacherRequest = () => {
    const axiosSecure = useAxiosSecure();

    const { data, refetch } = useQuery({
        queryKey: ['teacherRequests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/applications');
            return res.data;
        }
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
                axiosSecure.patch(`/applications/approve/${request._id}`, { status: 'accepted' })
                    .then(async () => {
                        await axiosSecure.patch(`/users/role/${request.userEmail}`, { role: 'teacher' });
                        refetch();
                        Swal.fire(
                            'Approved!',
                            'The request has been approved and the user is now a teacher.',
                            'success'
                        );
                    })
                    .catch((error) => {
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
                axiosSecure.patch(`/applications/reject/${request._id}`, { status: 'rejected' })
                    .then(() => {
                        refetch();
                        Swal.fire(
                            'Rejected!',
                            'The request has been rejected.',
                            'error'
                        );
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: 'Error!',
                            text: 'There was an issue rejecting the request.',
                            icon: 'error',
                        });
                    });
            }
        });
    };

    const handleRequestAgain = (request) => {
        axiosSecure.patch(`/applications/request-again/${request._id}`, { status: 'pending' })
            .then(() => {
                refetch();
                Swal.fire(
                    'Requested Again!',
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

    return (
        <div className="mt-10 md:mt-14 mb-20 px-5 lg:px-5">
            <div className="p-5 md:p-8 shadow-lg rounded-lg border">
                <h2 className="text-3xl font-bold text-center mb-6">Teacher Requests</h2>

                <div className="overflow-x-auto rounded-t-xl mt-5">
                    <table className="table">
                        {/* Table Head */}
                        <thead>
                            <tr className="bg-[#D1A054] text-white text-center uppercase">
                                <th className="py-5">#</th>
                                <th className="py-5">Name</th>
                                <th className="py-5">Image</th>
                                <th className="py-5">Experience</th>
                                <th className="py-5">Title</th>
                                <th className="py-5">Category</th>
                                <th className="py-5">Status</th>
                                <th className="py-5">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((request, index) => (
                                <tr key={request._id} className="text-center hover:bg-gray-50">
                                    <td className="py-5 font-bold">{index + 1}</td>
                                    <td className="py-5">{request.name}</td>
                                    <td className="py-5">
                                        <img src={request.image} alt={request.name} className="w-12 h-12 rounded-full mx-auto" />
                                    </td>
                                    <td className="py-5">{request.experience}</td>
                                    <td className="py-5">{request.title}</td>
                                    <td className="py-5">{request.category}</td>
                                    <td className="py-5">
                                        <span
                                            className={`text-${request.status === 'pending' ? 'yellow' : request.status === 'accepted' ? 'green' : 'red'}-600`}
                                        >
                                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                        </span>
                                    </td>
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
                                        ) : request.status === 'accepted' ? (
                                            <button
                                                className="btn btn-sm bg-gray-400 cursor-not-allowed"
                                                disabled
                                            >
                                                Approved
                                            </button>
                                        ) : (
                                            <button
                                                className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white"
                                                onClick={() => handleRequestAgain(request)}
                                            >
                                                Request Again
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TeacherRequest;
