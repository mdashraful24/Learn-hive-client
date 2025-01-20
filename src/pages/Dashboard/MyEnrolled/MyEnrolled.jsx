// import React from 'react';
// import useAuth from "../../../hooks/useAuth";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";
// import { useQuery } from '@tanstack/react-query';
// import { useNavigate } from 'react-router-dom';

// const MyEnrolled = () => {
//     const { user } = useAuth();
//     const axiosPublic = useAxiosPublic();
//     const navigate = useNavigate();

//     // Fetch enrolled classes using the new format
//     const { data: approvedClasses = [], isLoading, isError } = useQuery({
//         queryKey: ["approvedClasses"],
//         queryFn: async () => {
//             const res = await axiosPublic.get(`/myEnroll/${user.email}`);
//             return res.data;
//         },
//     });

//     if (isLoading) {
//         return <div>Loading...</div>;
//     }

//     if (isError) {
//         return <div>Error: {isError.message}</div>;
//     }

//     const handleEnrollDetails = (id) => {
//         navigate(`/dashboard/myEnroll-class/${id}`);
//     };

//     return (
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
//             {approvedClasses.map((course) => (
//                 <div key={course._id} className="bg-white shadow-md rounded-md p-4">
//                     <img className="w-full h-48 object-cover rounded-md" src={course.image} alt={course.title} />
//                     <h3 className="text-xl font-bold mt-4">{course.title}</h3>
//                     <p className="text-gray-600">By: {course.name}</p>
//                     <button
//                         onClick={() => handleEnrollDetails(course._id)}
//                         className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
//                         Continue
//                     </button>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default MyEnrolled;


// Final
// import React from 'react';
// import useAuth from "../../../hooks/useAuth";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";
// import { useQuery } from '@tanstack/react-query';
// import { useNavigate } from 'react-router-dom';

// const MyEnrolled = () => {
//     const { user } = useAuth();
//     const axiosPublic = useAxiosPublic();
//     const navigate = useNavigate();

//     // Fetch enrolled classes using the new format
//     const { data: approvedClasses = [], isLoading, isError } = useQuery({
//         queryKey: ["approvedClasses"],
//         queryFn: async () => {
//             const res = await axiosPublic.get(`/payments/${user.email}`);
//             return res.data;
//         },
//     });

//     if (isLoading) {
//         return <div>Loading...</div>;
//     }

//     if (isError) {
//         return <div>Error: {isError.message}</div>;
//     }

//     const handleEnrollDetails = (course) => {
//         navigate(`/dashboard/myEnroll-class/${course._id}`, { state: { assignments: course.assignment } });
//     };

//     return (
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
//             {approvedClasses.map((course) => (
//                 <div key={course._id} className="bg-white shadow-md rounded-md p-4">
//                     <img className="w-full h-48 object-cover rounded-md" src={course.image} alt={course.title} />
//                     <h3 className="text-xl font-bold mt-4">{course.title}</h3>
//                     <p className="text-gray-600">By: {course.name}</p>
//                     <button
//                         onClick={() => handleEnrollDetails(course)}
//                         className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
//                         Continue
//                     </button>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default MyEnrolled;



import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const MyEnrolled = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    // Fetch enrolled classes
    const { data: approvedClasses = [], isLoading, isError } = useQuery({
        queryKey: ["approvedClasses"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/payments/${user.email}`);
            return res.data;
        },
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {isError.message}</div>;
    }

    if (approvedClasses.length === 0) {
        return (
            <div className="text-center mt-10">
                <p className="text-lg font-semibold text-gray-600">
                    No enrolled classes found. Please explore our courses and start learning!
                </p>
            </div>
        );
    }

    const handleEnrollDetails = (course) => {
        // Navigate to the enrolled class page and pass the course ID via state
        navigate(`/dashboard/myEnroll-class/${course._id}`);
    };

    return (
        <div className="mt-10">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-5">My Enrolled Classes</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {approvedClasses.map((course) => (
                    <div key={course._id} className="bg-white shadow-md rounded-md p-4">
                        <img
                            className="w-full h-48 object-cover rounded-md"
                            src={course.image}
                            alt={course.title}
                        />
                        <h3 className="text-xl font-bold mt-4">{course.title}</h3>
                        <p className="text-gray-600">Posted By: {course.name}</p>
                        <button
                            onClick={() => handleEnrollDetails(course)}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Continue
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyEnrolled;
