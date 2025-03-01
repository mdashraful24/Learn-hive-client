import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
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
    const navigate = useNavigate();
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

    // Submit Form
    const onSubmit = async (data) => {
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
                                    navigate("/");
                                }
                            });
                    })
                    .catch((error) => {
                        toast.error("Email has already been used.", {
                            position: "top-center"
                        });
                    });
            }
        } catch (error) {
            console.error("Error uploading image or signing up:", error);
            toast.error("Something went wrong! Please try again.", {
                position: "top-right"
            });
        }
    };

    return (
        <div className='mt-10 pb-16 px-3'>
            {/* Helmet */}
            <Helmet>
                <title>Sign Up | LearnHive</title>
            </Helmet>

            {/* title */}
            <h1 className="text-2xl md:text-4xl font-extrabold text-center mb-5">Create a new account</h1>

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
                            placeholder="Type here your full name" className="input input-bordered border-black rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" />
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
                            placeholder="Type here your email" className="input input-bordered border-black rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                        {errors.email && <span className="text-sm text-red-600 mt-1">Email is required</span>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5">
                        {/* Phone Number */}
                        <div className="form-control">
                            <label className="label font-semibold">
                                <span className="label-text">Phone Number<span className="text-base text-red-500">*</span></span>
                            </label>
                            <input
                                type="tel"
                                {...register("phone", {
                                    required: "Phone number is required",
                                    validate: {
                                        minLength: (value) =>
                                            value.length >= 6 || "Phone number must be at least 6 digits",
                                        maxLength: (value) =>
                                            value.length <= 11 || "Phone number cannot exceed 11 digits",
                                    },
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: "Phone number can only contain digits",
                                    },
                                })}
                                name="phone"
                                placeholder="Type here your phone number"
                                className="input input-bordered border-black rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                                className="file-input file-input-bordered border-black rounded-md focus:outline-none"
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
                            className="input input-bordered border-black rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassWord)}
                            className="absolute right-4 top-[56px]"
                        >
                            {showPassWord ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        {errors.password && <span className="text-sm text-red-600 mt-1">{errors.password.message}</span>}
                    </div>

                    {/* Button */}
                    <div className="form-control mt-6">
                        <input
                            className="btn w-full text-white font-medium bg-gradient-to-r from-blue-600 to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-md transition-all duration-200 border-none rounded-md"
                            type="submit"
                            value="Sign Up" />
                    </div>

                    {/* Other Options */}
                    <div className='text-center font-semibold mt-2'>
                        <p className='mb-1'><small>Already Signed Up? Go to <span className='text-blue-500 mb-2'><Link to="/login">log in</Link></span></small></p>
                        <small>Or sign in with</small>
                    </div>
                </form>

                {/* Social Sign-In */}
                <div className="px-2 md:px-0 mt-3">
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default SignUp;