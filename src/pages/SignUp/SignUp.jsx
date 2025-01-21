import bgImg from '../../../src/assets/auth/authentication.png';
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const { setUser, createUser, handleGoogleSignIn, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors }, } = useForm();

    // Submit Form
    const onSubmit = (data) => {

        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log("User created:", loggedUser);
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
                    role: 'student', // Set default role to 'student'
                    joinedDate: new Date().toISOString() // Add current date and time
                };
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            console.log('user added to the database');
                            reset();
                            toast.success("Successfully Signed Up");
                            navigate("/");
                        }
                    })
            })
    }

    return (
        <div className='mt-10 mb-20 md:px-5'>
            {/* Helmet */}
            <Helmet>
                <title>Sign Up | Bistro Boss Restaurant</title>
            </Helmet>

            {/* Bg Image */}
            <div className="hero min-h-screen">
                {/* Bg Image */}
                <div className="hero-content flex-col md:flex-row-reverse gap-0 md:gap-5 lg:gap-16 pb-10 border-2 rounded-lg" style={{
                    backgroundImage: `url('${bgImg})`
                }}>
                    {/* Image */}
                    <div className="text-center w-[300px] md:w-1/2 lg:text-left">
                        <img className='w-[200px] md:w-[500px] hidden md:block' src={bgImg} alt="" />
                    </div>
                    <div className="card w-full max-w-sm rounded-none lg:pr-10">

                        {/* Sign In Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body p-5">
                            <h1 className="text-3xl font-bold text-center">Sign Up</h1>
                            {/* Name */}
                            <div className="form-control">
                                <label className="label font-semibold">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text" {...register("name", { required: true })}
                                    name="name"
                                    placeholder="Type here your name" className="input input-bordered rounded-md" />
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
                                    placeholder="Type here your email" className="input input-bordered rounded-md" />
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
                                        pattern: {
                                            value: /^[0-9]{6}$/,
                                            message: "Phone number must be exactly 6 digits"
                                        }
                                    })}
                                    name="phone"
                                    placeholder="Type here your phone number"
                                    className="input input-bordered rounded-md"
                                />
                                {errors.phone && <span className="text-sm text-red-600">{errors.phone.message}</span>}
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
                                    className="input input-bordered rounded-md" />
                                {errors.photo && <span className="text-sm text-red-600">Photo URL is required</span>}
                            </div>

                            {/* Password */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Password</span>
                                </label>
                                <input
                                    type="password"
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
                                    className="input input-bordered rounded-md"
                                />
                                {errors.password && <span className="text-sm text-red-600">{errors.password.message}</span>}
                            </div>

                            {/* Button */}
                            <div className="form-control mt-6">
                                <input
                                    className="btn bg-[#D1A054B3] hover:bg-[#d19f54] rounded-md" type="submit"
                                    value="Sign Up" />
                            </div>

                            {/* Other Options */}
                            <div className='text-center font-semibold mt-2'>
                                <p className='mb-1'><small>Already Signed Up? <span className='hover:text-red-500 mb-2'><Link to="/login">Go to log in</Link></span></small></p>
                                <small>Or sign in with</small>
                            </div>
                        </form>

                        {/* Social Sign-In */}
                        <SocialLogin />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
