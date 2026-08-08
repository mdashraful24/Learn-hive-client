import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

// Cloudinary configuration
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const SignUp = () => {
    window.scrollTo(0, 0);
    const axiosPublic = useAxiosPublic();
    const { setUser, createUser, updateUserProfile } = useAuth();
    const [showPassWord, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

    // Submit Form
    const onSubmit = async (data) => {
        setLoading(true);
        const imageFile = data.image[0];

        // Upload image to Cloudinary
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", uploadPreset);

        try {
            const cloudinaryRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: "POST",
                body: formData,
            });

            const cloudinaryData = await cloudinaryRes.json();

            if (cloudinaryData.secure_url) {
                // Create user with the uploaded image URL
                createUser(data.email, data.password)
                    .then((result) => {
                        const loggedUser = result.user;
                        setUser(loggedUser);
                        return updateUserProfile({ displayName: data.name, photoURL: cloudinaryData.secure_url });
                    })
                    .then(() => {
                        // Save user info to the database
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            image: cloudinaryData.secure_url,
                            phone: data.phone,
                            role: 'student',
                            joinedDate: new Date().toISOString(),
                        };
                        axiosPublic.post('/users', userInfo)
                            .then((res) => {
                                if (res.data.insertedId) {
                                    reset();
                                    toast.success("Successfully Signed Up", {
                                        position: "top-center"
                                    });
                                    setLoading(false);
                                    navigate("/");
                                }
                            });
                    })
                    .catch((error) => {
                        toast.error("Email has already been used.", {
                            position: "top-center"
                        });
                        setLoading(false);
                    });
            }
        } catch (error) {
            console.error("Error uploading image or signing up:", error);
            toast.error("Something went wrong! Please try again.", {
                position: "top-right"
            });
            setLoading(false);
        }
    };

    // Phone number validation function
    const validatePhoneNumber = (value) => {
        if (!value) return "Phone number is required";

        // Remove all spaces, hyphens, parentheses, and plus sign for validation
        const cleanNumber = value.replace(/[\s\-()]/g, '');

        // Check if it's a valid phone number format
        // Supports: +1234567890, 1234567890, +1-234-567-8900, (123) 456-7890, etc.
        const phoneRegex = /^\+?[\d\s\-()]{7,20}$/;

        if (!phoneRegex.test(value)) {
            return "Please enter a valid phone number";
        }

        // Check if it has at least 7 digits
        const digitCount = value.replace(/\D/g, '').length;
        if (digitCount < 7) {
            return "Phone number must have at least 7 digits";
        }

        return true;
    };

    return (
        <div className='min-h-[80vh] mt-10 pb-16 px-3'>
            {/* Helmet */}
            <Helmet>
                <title>Sign Up | LearnHive</title>
            </Helmet>

            {/* title */}
            <h1 className="text-2xl md:text-4xl font-bold text-center mb-3">Sign Up your account</h1>
            <p className="text-lg text-center mb-5">Please enter your details to sign Up.</p>

            {/* Sign In Form */}
            <div className="card w-full max-w-xl mx-auto border shadow-md pb-5">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body px-5 py-1.5">
                    {/* Name */}
                    <div className="form-control">
                        <label className="label font-semibold">
                            <span className="label-text">Name<span className="text-base text-red-500">*</span></span>
                        </label>
                        <input
                            type="text" {...register("name", { required: true })}
                            name="name"
                            placeholder="Enter your full name"
                            className={`block w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out`}
                            disabled={loading}
                        />
                        {errors.name && <span className="text-sm text-red-600 mt-1">Name is required</span>}
                    </div>

                    {/* Email */}
                    <div className="form-control">
                        <label className="label font-semibold">
                            <span className="label-text">Email<span className="text-base text-red-500">*</span></span>
                        </label>
                        <input
                            type="email" {...register("email", { required: true })}
                            name="email"
                            placeholder="Enter your email"
                            className={`block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out`}
                            disabled={loading}
                        />
                        {errors.email && <span className="text-sm text-red-600 mt-1">Email is required</span>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5">
                        {/* Phone Number - Updated */}
                        <div className="form-control">
                            <label className="label font-semibold">
                                <span className="label-text">Phone Number<span className="text-base text-red-500">*</span></span>
                            </label>
                            <input
                                type="tel"
                                {...register("phone", {
                                    required: "Phone number is required",
                                    validate: validatePhoneNumber
                                })}
                                name="phone"
                                placeholder="Enter your phone number"
                                className={`block w-full px-3 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out`}
                                disabled={loading}
                            />
                            {errors.phone && (
                                <span className="text-sm text-red-600 mt-1">{errors.phone.message}</span>
                            )}
                        </div>

                        {/* Photo Upload */}
                        <div className="form-control">
                            <label className="label font-semibold">
                                <span className="label-text">Upload Profile Picture<span className="text-base text-red-500">*</span></span>
                            </label>
                            <input
                                type="file"
                                {...register("image", { required: "Profile photo is required" })}
                                name="image"
                                className="file-input file-input-bordered h-[2.5rem] border-black rounded-md focus:outline-none"
                                disabled={loading}
                            />
                            {errors.image && (
                                <span className="text-sm text-red-600 mt-1">{errors.image.message}</span>
                            )}
                        </div>
                    </div>

                    {/* Password */}
                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text font-semibold">Password<span className="text-base text-red-500">*</span></span>
                        </label>
                        <input
                            type={showPassWord ? "text" : "password"}
                            {...register("password", {
                                required: "Password is required",
                                maxLength: {
                                    value: 20,
                                    message: "Password cannot be more than 20 characters",
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                                    message: "Password must contain at least one uppercase, one lowercase, and be at least 6 characters long",
                                }
                            })}
                            name="password"
                            placeholder="Type here strong password"
                            className={`block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out`}
                            disabled={loading}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassWord)}
                            className={`absolute right-4 top-[53px] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {showPassWord ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        {errors.password && <span className="text-sm text-red-600 mt-1">{errors.password.message}</span>}
                    </div>

                    {/* Button with Loading State */}
                    <div className="form-control mt-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`btn w-full text-white font-medium bg-gradient-to-r from-blue-600 to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-md transition-all duration-200 border-none rounded-md ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:from-blue-700 hover:to-blue-800'}`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2 text-white">
                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing Up...
                                </span>
                            ) : (
                                "Sign Up"
                            )}
                        </button>
                    </div>
                </form>

                {/* Sign Up Link */}
                <p className="text-center text-sm mt-3">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-semibold text-blue-500 hover:text-blue-400 transition duration-150 ease-in-out"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
