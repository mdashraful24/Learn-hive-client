import Swal from 'sweetalert2';
import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosPublic from '../../hooks/useAxiosPublic';

const TeachOnLearnHive = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        const newApplication = {
            ...data,
            userEmail: user?.email,
            status: "pending"
        };

        try {
            const response = await axiosPublic.post('/applications', newApplication);
            if (response.data.insertedId) {
                Swal.fire({
                    title: "Success!",
                    text: "Application submitted successfully",
                    icon: "success",
                    confirmButtonText: "Cool",
                });
            }
            reset();
        } catch (error) {
            console.error("Error submitting application", error);
            Swal.fire({
                title: "Error!",
                text: "There was an error submitting your application. Please try again later.",
                icon: "error",
                confirmButtonText: "Okay",
            });
        }
    };

    return (
        <div className="mt-10 md:mt-14 mb-24 px-2.5">
            <div className="max-w-3xl mx-auto p-5 md:p-8 shadow-lg rounded-lg border">
                {/* Helmet */}
                <Helmet>
                    <title>Teach on LearnHive | LearnHive</title>
                </Helmet>

                <h2 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-10">Apply for Teaching Position</h2>

                {/* User Info */}
                <div className="text-center mb-6">
                    {user?.photoURL && (
                        <img
                            src={user.photoURL}
                            alt="User Profile"
                            className="w-24 h-24 rounded-full mx-auto mb-3 shadow-xl border-2 border-gray-400"
                        />
                    )}
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                        {/* Name */}
                        <div className="form-group mb-4">
                            <label className="block mb-2">Name</label>
                            <input
                                type="text"
                                defaultValue={user?.displayName || ""}
                                {...register("name", { required: true })}
                                className="w-full p-3 border border-black rounded-md"
                                placeholder="Enter your name"
                            />
                            {errors.name && <span className="text-red-600">Name is required</span>}
                        </div>

                        {/* User Email */}
                        <div className="form-group mb-4">
                            <label className="block mb-2">Email</label>
                            <input
                                type="email"
                                value={user?.email || ""}
                                readOnly
                                className="w-full p-3 border border-black rounded-md cursor-not-allowed"
                            />
                        </div>

                        {/* Image */}
                        <div className="form-group mb-4">
                            <label className="block text-base mb-2">Photo URL</label>
                            <input
                                type="text"
                                defaultValue={user?.photoURL || ""}
                                {...register("image", { required: true })}
                                className="w-full p-3 border border-black rounded-md"
                                placeholder="Enter image URL"
                            />
                            {errors.image && <span className="text-red-600">Image URL is required</span>}
                        </div>

                        {/* Title */}
                        <div className="form-group mb-4">
                            <label className="block mb-2">Title</label>
                            <input
                                type="text"
                                {...register("title", { required: true })}
                                className="w-full p-3 border border-black rounded-md"
                                placeholder="Enter title"
                            />
                            {errors.title && <span className="text-red-600">Title is required</span>}
                        </div>

                        {/* Experience */}
                        <div className="form-group mb-4">
                            <label className="block mb-2">Experience Level</label>
                            <select defaultValue=""
                                {...register("experience", { required: true })}
                                className="w-full p-3 border border-black rounded-md"
                            >
                                <option value="" disabled>
                                    Select your experience level
                                </option>
                                <option value="beginner">Beginner</option>
                                <option value="experienced">Experienced</option>
                                <option value="mid-level">Mid-level</option>
                            </select>
                            {errors.experience && <span className="text-red-600">Experience level is required</span>}
                        </div>
                        
                        {/* Category */}
                        <div className="form-group mb-4">
                            <label className="block mb-2">Category</label>
                            <select defaultValue=""
                                {...register("category", { required: true })}
                                className="w-full p-3 border border-black rounded-md"
                            >
                                <option value="" disabled>
                                    Select a category
                                </option>
                                <option value="web development">Web Development</option>
                                <option value="digital marketing">Digital Marketing</option>
                                <option value="graphic design">Graphic Design</option>
                                <option value="data science">Data Science</option>
                                <option value="cyber security">Cyber Security</option>
                            </select>
                            {errors.category && <span className="text-red-600">Category is required</span>}
                        </div>
                    </div>
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn w-full mt-5 bg-blue-600 text-base text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-500"
                    >
                        Submit for Review
                    </button>
                </form>
            </div>
            <p className='max-w-3xl mx-auto mt-5'>
                <span className='text-red-600 font-bold'>Note:</span> Change your name and photo URL if you want.
            </p>
        </div>
    );
};

export default TeachOnLearnHive;
