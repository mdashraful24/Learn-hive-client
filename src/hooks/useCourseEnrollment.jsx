import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCourseEnrollment = (courseId) => {
    const axiosPublic = useAxiosPublic();

    const { data: enrollmentData, isLoading, isError } = useQuery({
        queryKey: ["courseEnrollment", courseId],
        queryFn: async () => {
            const res = await axiosPublic.get("/enroll");
            return res.data;
        },
        enabled: !!courseId,
    });

    const courseEnrollment = enrollmentData?.filter(
        (enrollment) => enrollment.courseId === courseId
    ).length || 0;

    return { courseEnrollment, isLoading, isError };
};

export default useCourseEnrollment;
