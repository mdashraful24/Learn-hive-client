// import bgImg from '../../../src/assets/auth/authentication.png';
// import { Helmet } from "react-helmet-async";
// import { Link, useNavigate } from "react-router-dom";
// import useAuth from '../../hooks/useAuth';
// import { useForm } from 'react-hook-form';
// import { toast } from 'react-toastify';
// import SocialLogin from '../../components/SocialLogin/SocialLogin';
// import useAxiosPublic from '../../hooks/useAxiosPublic';
// import { useState } from 'react';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';

// const SignUp = () => {
//     const axiosPublic = useAxiosPublic();
//     const { setUser, createUser, handleGoogleSignIn, updateUserProfile } = useAuth();
//     const [showPassWord, setShowPassword] = useState(false);
//     const navigate = useNavigate();
//     const { register, handleSubmit, reset, formState: { errors }, } = useForm();

//     // Submit Form
//     const onSubmit = (data) => {

//         createUser(data.email, data.password)
//             .then(result => {
//                 const loggedUser = result.user;
//                 console.log("User created:", loggedUser);
//                 setUser(loggedUser);
//                 updateUserProfile(data.name, data.photo);
//                 return updateUserProfile({ displayName: data.name, photoURL: data.photo });
//             })
//             .then(() => {
//                 // console.log('user profile info updated')
//                 const userInfo = {
//                     name: data.name,
//                     email: data.email,
//                     image: data.photo,
//                     phone: data.phone,
//                     role: 'student',
//                     joinedDate: new Date().toISOString()
//                 };
//                 axiosPublic.post('/users', userInfo)
//                     .then(res => {
//                         if (res.data.insertedId) {
//                             console.log('user added to the database');
//                             reset();
//                             toast.success("Successfully Signed Up");
//                             navigate("/");
//                         }
//                     })
//             })
//             .catch(error => {
//                 toast.error("Email has already been used.");
//             });
//     }

//     return (
//         <div className='mt-10 mb-28 md:px-5'>
//             {/* Helmet */}
//             <Helmet>
//                 <title>Sign Up | Bistro Boss Restaurant</title>
//             </Helmet>

//             {/* Bg Image */}
//             <div className="hero">
//                 {/* Bg Image */}
//                 <div className="hero-content flex-col md:flex-row-reverse gap-0 md:gap-5 lg:gap-16 pb-10 border-2 rounded-lg" style={{
//                     backgroundImage: `url('${bgImg})`
//                 }}>
//                     {/* Image */}
//                     <div className="text-center w-[300px] md:w-1/2 lg:text-left">
//                         <img className='w-[200px] md:w-[500px] hidden md:block' src={bgImg} alt="" />
//                     </div>
//                     <div className="card w-full max-w-sm rounded-none lg:pr-10">

//                         {/* Sign In Form */}
//                         <form onSubmit={handleSubmit(onSubmit)} className="card-body p-5">
//                             <h1 className="text-3xl font-bold text-center">Sign Up</h1>
//                             {/* Name */}
//                             <div className="form-control">
//                                 <label className="label font-semibold">
//                                     <span className="label-text">Name</span>
//                                 </label>
//                                 <input
//                                     type="text" {...register("name", { required: true })}
//                                     name="name"
//                                     placeholder="Type here your name" className="input input-bordered rounded-md" />
//                                 {errors.name && <span className="text-sm text-red-600">Name is required</span>}
//                             </div>
//                             {/* Email */}
//                             <div className="form-control">
//                                 <label className="label font-semibold">
//                                     <span className="label-text">Email</span>
//                                 </label>
//                                 <input
//                                     type="email" {...register("email", { required: true })}
//                                     name="email"
//                                     placeholder="Type here your email" className="input input-bordered rounded-md" />
//                                 {errors.email && <span className="text-sm text-red-600">Email is required</span>}
//                             </div>

//                             {/* Phone Number */}
//                             {/* <div className="form-control">
//                                 <label className="label font-semibold">
//                                     <span className="label-text">Phone Number</span>
//                                 </label>
//                                 <input
//                                     type="tel"
//                                     {...register("phone", {
//                                         required: "Phone number is required",
//                                         pattern: {
//                                             value: /^[0-9]{6,11}$/,
//                                             message: "Phone number must be a minimum of six and a maximum of 11 digits"
//                                         }
//                                     })}
//                                     name="phone"
//                                     placeholder="Type here your phone number"
//                                     className="input input-bordered rounded-md"
//                                 />
//                                 {errors.phone && <span className="text-sm text-red-600">{errors.phone.message}</span>}
//                             </div> */}
//                             <div className="form-control">
//                                 <label className="label font-semibold">
//                                     <span className="label-text">Phone Number</span>
//                                 </label>
//                                 <input
//                                     type="tel"
//                                     {...register("phone", {
//                                         required: "Phone number is required",
//                                         validate: {
//                                             minLength: (value) =>
//                                                 value.length >= 6 || "Phone number must be at least 6 digits",
//                                             maxLength: (value) =>
//                                                 value.length <= 11 || "Phone number cannot exceed 11 digits",
//                                         },
//                                         pattern: {
//                                             value: /^[0-9]+$/,
//                                             message: "Phone number can only contain digits",
//                                         },
//                                     })}
//                                     name="phone"
//                                     placeholder="Type here your phone number"
//                                     className="input input-bordered rounded-md"
//                                 />
//                                 {errors.phone && (
//                                     <span className="text-sm text-red-600">{errors.phone.message}</span>
//                                 )}
//                             </div>

//                             {/* Photo URL */}
//                             <div className="form-control">
//                                 <label className="label font-semibold">
//                                     <span className="label-text">Photo URL</span>
//                                 </label>
//                                 <input
//                                     type="photo" {...register("photo", { required: true })}
//                                     name="photo"
//                                     placeholder="Enter your photo URL"
//                                     className="input input-bordered rounded-md" />
//                                 {errors.photo && <span className="text-sm text-red-600">Photo URL is required</span>}
//                             </div>

//                             {/* Password */}
//                             <div className="form-control relative">
//                                 <label className="label">
//                                     <span className="label-text font-semibold">Password</span>
//                                 </label>
//                                 <input
//                                     type={showPassWord ? "text" : "password"}
//                                     {...register("password", {
//                                         required: "Password is required",
//                                         maxLength: {
//                                             value: 20,
//                                             message: "Password cannot be more than 20 characters",
//                                         },
//                                         pattern: {
//                                             value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
//                                             message: "Password must contain at least one uppercase, and one lowercase, and be at least 6 characters long",
//                                         }
//                                     })}
//                                     name="password"
//                                     placeholder="Type here strong password"
//                                     className="input input-bordered rounded-md"
//                                 />
//                                 <button
//                                     type="button"
//                                     onClick={() => setShowPassword(!showPassWord)}
//                                     className="absolute right-4 top-[52px]"
//                                 >
//                                     {showPassWord ? <FaEyeSlash /> : <FaEye />}
//                                 </button>
//                                 {errors.password && <span className="text-sm text-red-600">{errors.password.message}</span>}
//                             </div>

//                             {/* Button */}
//                             <div className="form-control mt-6">
//                                 <input
//                                     className="btn btn-primary rounded-md" type="submit"
//                                     value="Sign Up" />
//                             </div>

//                             {/* Other Options */}
//                             <div className='text-center font-semibold mt-2'>
//                                 <p className='mb-1'><small>Already Signed Up? <span className='hover:text-red-500 mb-2'><Link to="/login">Go to log in</Link></span></small></p>
//                                 <small>Or sign in with</small>
//                             </div>
//                         </form>

//                         {/* Social Sign-In */}
//                         <SocialLogin />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SignUp;



import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const { setUser, createUser, handleGoogleSignIn, updateUserProfile } = useAuth();
    const [showPassWord, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors }, } = useForm();

    // Submit Form
    const onSubmit = (data) => {

        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                // console.log("User created:", loggedUser);
                setUser(loggedUser);
                updateUserProfile(data.name, data.photo);
                return updateUserProfile({ displayName: data.name, photoURL: data.photo });
            })
            .then(() => {
                // console.log('user profile info updated')
                const userInfo = {
                    name: data.name,
                    email: data.email,
                    image: data.photo,
                    phone: data.phone,
                    role: 'student',
                    joinedDate: new Date().toISOString()
                };
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            // console.log('user added to the database');
                            reset();
                            toast.success("Successfully Signed Up");
                            navigate("/");
                        }
                    })
            })
            .catch(error => {
                toast.error("Email has already been used.");
            });
    }

    return (
        <div className='mt-10 mb-28 px-3'>
            {/* Helmet */}
            <Helmet>
                <title>Sign Up | Bistro Boss Restaurant</title>
            </Helmet>

            {/* title */}
            <h1 className="text-3xl font-bold text-center mb-5">Create a new account</h1>

            {/* Sign In Form */}
            <div className="card w-full max-w-xl mx-auto border shadow-xl pb-5">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body p-5">
                    {/* Name */}
                    <div className="form-control">
                        <label className="label font-semibold">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text" {...register("name", { required: true })}
                            name="name"
                            placeholder="Type here your name" className="input input-bordered border-black rounded-md" />
                        {errors.name && <span className="text-sm text-red-600">Name is required</span>}
                    </div>
                    {/* Email */}
                    <div className="form-control">
                        <label className="label font-semibold">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email" {...register("email", { required: true })}
                            name="email"
                            placeholder="Type here your email" className="input input-bordered border-black rounded-md" />
                        {errors.email && <span className="text-sm text-red-600">Email is required</span>}
                    </div>

                    {/* Phone Number */}
                    <div className="form-control">
                        <label className="label font-semibold">
                            <span className="label-text">Phone Number</span>
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
                            className="input input-bordered border-black rounded-md"
                        />
                        {errors.phone && (
                            <span className="text-sm text-red-600">{errors.phone.message}</span>
                        )}
                    </div>

                    {/* Photo URL */}
                    <div className="form-control">
                        <label className="label font-semibold">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input
                            type="photo" {...register("photo", { required: true })}
                            name="photo"
                            placeholder="Enter your photo URL"
                            className="input input-bordered border-black rounded-md" />
                        {errors.photo && <span className="text-sm text-red-600">Photo URL is required</span>}
                    </div>

                    {/* Password */}
                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text font-semibold">Password</span>
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
                                    message: "Password must contain at least one uppercase, and one lowercase, and be at least 6 characters long",
                                }
                            })}
                            name="password"
                            placeholder="Type here strong password"
                            className="input input-bordered border-black rounded-md"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassWord)}
                            className="absolute right-4 top-[52px]"
                        >
                            {showPassWord ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        {errors.password && <span className="text-sm text-red-600">{errors.password.message}</span>}
                    </div>

                    {/* Button */}
                    <div className="form-control mt-6">
                        <input
                            className="btn btn-primary rounded-md" type="submit"
                            value="Sign Up" />
                    </div>

                    {/* Other Options */}
                    <div className='text-center font-semibold mt-2'>
                        <p className='mb-1'><small>Already Signed Up? Go to <span className='text-blue-500 mb-2'><Link to="/login">log in</Link></span></small></p>
                        <small>Or sign in with</small>
                    </div>
                </form>

                {/* Social Sign-In */}
                <SocialLogin />
            </div>
        </div>
    );
};

export default SignUp;
