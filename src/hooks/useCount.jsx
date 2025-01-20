import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCount = () => {
    const axiosPublic = useAxiosPublic();

    // Fetch the classes and assignments data
    const { data: classesData, isLoading: isLoadingClasses, isError: isErrorClasses } = useQuery({
        queryKey: ["classCounts"], // Query key for classes and assignments data
        queryFn: async () => {
            const res = await axiosPublic.get("http://localhost:5000/all-classes");
            return res.data;
        },
    });

    // Fetch the total number of users
    const { data: usersData, isLoading: isLoadingUsers, isError: isErrorUsers } = useQuery({
        queryKey: ["userCounts"], // Query key for users data
        queryFn: async () => {
            const res = await axiosPublic.get("http://localhost:5000/users");
            return res.data;
        },
    });

    // Fetch the enrollment data to calculate total enrolment
    const { data: enrollmentData, isLoading: isLoadingEnrollment, isError: isErrorEnrollment } = useQuery({
        queryKey: ["enrollmentCounts"], // Query key for enrollment data
        queryFn: async () => {
            const res = await axiosPublic.get("http://localhost:5000/enroll");
            return res.data;
        },
    });

    // Combine loading and error states
    if (isLoadingClasses || isLoadingUsers || isLoadingEnrollment) {
        return { isLoading: true, totalAssignments: 0, totalClasses: 0, totalUsers: 0, totalEnrollment: 0 };
    }

    if (isErrorClasses || isErrorUsers || isErrorEnrollment) {
        return { isError: true, totalAssignments: 0, totalClasses: 0, totalUsers: 0, totalEnrollment: 0 };
    }

    // Extract the total number of assignments, classes, users, and total enrollment from the fetched data
    const totalAssignments = classesData.totalAssignments || 0;
    const totalClasses = classesData.totalClasses || 0;
    const totalUsers = usersData.length || 0; // Count the length of usersData array

    // Calculate total enrolment by summing `totalEnrolment` from enrollmentData
    const totalEnrollment = enrollmentData.reduce((sum, enrollment) => sum + enrollment.totalEnrolment, 0);

    return { totalAssignments, totalClasses, totalUsers, totalEnrollment };
};

export default useCount;
