import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCount = () => {
    const axiosPublic = useAxiosPublic();

    // Fetch the classes and assignments data
    const { data: classesData, isLoading: isLoadingClasses, isError: isErrorClasses } = useQuery({
        queryKey: ["classCounts"],
        queryFn: async () => {
            const res = await axiosPublic.get("/all-classes");
            return res.data;
        },
    });

    // Fetch only the latest 6 classes
    const { data: sixClassesData, isLoading: isLoadingSixClasses, isError: isErrorSixClasses } = useQuery({
        queryKey: ["sixClassCounts"],
        queryFn: async () => {
            const res = await axiosPublic.get("/all-classes?limit=6");
            return res.data;
        },
    });

    // Fetch the total number of users
    const { data: usersData, isLoading: isLoadingUsers, isError: isErrorUsers } = useQuery({
        queryKey: ["userCounts"],
        queryFn: async () => {
            const res = await axiosPublic.get("/totalUsers");
            return res.data;
        },
    });

    // Fetch the enrollment data to calculate total enrolment
    const { data: enrollmentData, isLoading: isLoadingEnrollment, isError: isErrorEnrollment } = useQuery({
        queryKey: ["enrollmentCounts"],
        queryFn: async () => {
            const res = await axiosPublic.get("/enroll");
            return res.data;
        },
    });

    // Fetch the total submissions data for assignments
    const { data: submissionsData, isLoading: isLoadingSubmissions, isError: isErrorSubmissions } = useQuery({
        queryKey: ["submissionCounts"],
        queryFn: async () => {
            const res = await axiosPublic.get("/assignments");
            return res.data;
        },
    });

    // Combine loading and error states
    if (
        isLoadingClasses || isLoadingSixClasses || isLoadingUsers || isLoadingEnrollment || isLoadingSubmissions
    ) {
        return {
            isLoading: true,
            totalAssignments: 0,
            totalClasses: 0,
            totalUsers: 0,
            totalTeachers: 0,
            totalEnrollment: 0,
            totalSubmissions: 0,
            latestSixClasses: [],
        };
    }

    if (
        isErrorClasses || isErrorSixClasses || isErrorUsers || isErrorEnrollment || isErrorSubmissions
    ) {
        return {
            isError: true,
            totalAssignments: 0,
            totalClasses: 0,
            totalUsers: 0,
            totalTeachers: 0,
            totalEnrollment: 0,
            totalSubmissions: 0,
            latestSixClasses: [],
        };
    }

    // Extract total counts
    const totalAssignments = classesData?.totalAssignments || 0;
    const totalClasses = classesData?.totalClasses || 0;
    const totalUsers = usersData?.length || 0;
    const totalTeachers = usersData?.filter(user => user.role === "teacher").length || 0;
    const totalEnrollment = enrollmentData?.reduce((sum, enrollment) => sum + enrollment.totalEnrolment, 0) || 0;
    const totalSubmissions = submissionsData?.reduce((sum, submission) => sum + submission.submit, 0) || 0;
    const latestSixClasses = sixClassesData || [];

    return {
        totalAssignments,
        totalClasses,
        totalUsers,
        totalTeachers,
        totalEnrollment,
        totalSubmissions,
        latestSixClasses,
    };
};

export default useCount;






// reserve code
// import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "./useAxiosPublic";

// const useCount = () => {
//     const axiosPublic = useAxiosPublic();

//     // Fetch the classes and assignments data
//     const { data: classesData, isLoading: isLoadingClasses, isError: isErrorClasses } = useQuery({
//         queryKey: ["classCounts"],
//         queryFn: async () => {
//             const res = await axiosPublic.get("/all-classes");
//             return res.data;
//         },
//     });

//     // Fetch only the latest 6 classes
//     const { data: sixClassesData, isLoading: isLoadingSixClasses, isError: isErrorSixClasses } = useQuery({
//         queryKey: ["sixClassCounts"],
//         queryFn: async () => {
//             const res = await axiosPublic.get("/all-classes?limit=6");
//             return res.data;
//         },
//     });

//     // Fetch the total number of users
//     const { data: usersData, isLoading: isLoadingUsers, isError: isErrorUsers } = useQuery({
//         queryKey: ["userCounts"],
//         queryFn: async () => {
//             const res = await axiosPublic.get("/totalUsers");
//             return res.data;
//         },
//     });

//     // Fetch the enrollment data to calculate total enrolment
//     const { data: enrollmentData, isLoading: isLoadingEnrollment, isError: isErrorEnrollment } = useQuery({
//         queryKey: ["enrollmentCounts"],
//         queryFn: async () => {
//             const res = await axiosPublic.get("/enroll");
//             return res.data;
//         },
//     });

//     // Fetch the total submissions data for assignments
//     const { data: submissionsData, isLoading: isLoadingSubmissions, isError: isErrorSubmissions } = useQuery({
//         queryKey: ["submissionCounts"],
//         queryFn: async () => {
//             const res = await axiosPublic.get("/assignments");
//             return res.data;
//         },
//     });

//     // Determine the loading state
//     const isLoading = isLoadingClasses || isLoadingSixClasses || isLoadingUsers || isLoadingEnrollment || isLoadingSubmissions;

//     // Determine the error state
//     const isError = isErrorClasses || isErrorSixClasses || isErrorUsers || isErrorEnrollment || isErrorSubmissions;

//     if (isLoading) {
//         return {
//             loading: true,
//             totalAssignments: 0,
//             totalClasses: 0,
//             totalUsers: 0,
//             totalEnrollment: 0,
//             totalSubmissions: 0,
//             latestSixClasses: [],
//         };
//     }

//     if (isError) {
//         return {
//             isError: true,
//             totalAssignments: 0,
//             totalClasses: 0,
//             totalUsers: 0,
//             totalEnrollment: 0,
//             totalSubmissions: 0,
//             latestSixClasses: [],
//         };
//     }

//     // Extract the total number of assignments, classes, users, total enrollment, and submissions
//     const totalAssignments = classesData.totalAssignments || 0;
//     const totalClasses = classesData.totalClasses || 0;
//     const totalUsers = usersData.length || 0;
//     const totalEnrollment = enrollmentData.reduce((sum, enrollment) => sum + enrollment.totalEnrolment, 0);
//     const totalSubmissions = submissionsData.reduce((sum, submission) => sum + submission.submit, 0);
//     const latestSixClasses = sixClassesData || [];

//     return {
//         loading: false,
//         totalAssignments,
//         totalClasses,
//         totalUsers,
//         totalEnrollment,
//         totalSubmissions,
//         latestSixClasses,
//     };
// };

// export default useCount;
