import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Login = () => {
    const { signIn, setUser, handleGoogleSignIn } = useAuth();
    const [showPassWord, setShowPassword] = useState(false);
    const [error, setError] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // Submit Form
    const onSubmit = async (data) => {
        try {
            const result = await signIn(data.email, data.password);
            const user = result.user;
            setUser(user);

            Swal.fire({
                title: `Welcome "${user?.displayName}"`,
                text: `Hello, ${user?.displayName || user?.email}`,
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
            });
            navigate(from, { replace: true });
        } catch (err) {
            setError({ login: "Please check your email or password." });
            toast.error("Login Failed. Please try again.");
        }
    };

    return (
        <div className="pt-8 pb-20">
            {/* Helmet */}
            <Helmet>
                <title>Sign In | LearnHive</title>
            </Helmet>

            <div className="card w-full max-w-lg mx-auto">
                {/* Login Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="card-body md:p-5">
                    <h1 className="text-4xl font-bold text-center">Sign In</h1>

                    {/* Email Field */}
                    <div className="form-control">
                        <label className="label font-semibold">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Type here"
                            {...register("email", { required: "Email is required" })}
                            className={`input input-bordered border-black rounded-md ${errors.email}`}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-600">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text font-semibold">Password</span>
                        </label>
                        <input
                            type={showPassWord ? "text" : "password"}
                            placeholder="Enter your password"
                            {...register("password", { required: "Password is required" })}
                            className={`input input-bordered border-black rounded-md ${errors.password}`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassWord)}
                            className="absolute right-4 top-[52px]"
                        >
                            {showPassWord ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        {errors.password && (
                            <p className="text-sm text-red-600">{errors.password.message}</p>
                        )}
                        {error.login && (
                            <p className="label text-sm text-red-600">{error.login}</p>
                        )}
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">
                                Forgot password?
                            </a>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div className="form-control mt-6">
                        <button
                            type="submit"
                            className="btn bg-[#D1A054B3] hover:bg-[#d19f54] rounded-md"
                        >
                            Sign In
                        </button>
                    </div>

                    {/* Other Options */}
                    <div className="text-center font-semibold mt-2">
                        <p className="mb-1">
                            <small>
                                New here?{" "}
                                <span className="hover:text-red-500 mb-2">
                                    <Link to="/signUp">Create a New Account</Link>
                                </span>
                            </small>
                        </p>
                        <small>Or sign in with</small>
                    </div>
                </form>

                {/* Social Sign-In */}
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Login;
