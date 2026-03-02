import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Login = () => {
    window.scrollTo(0, 0);
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
        <div className="pt-8 pb-16 px-3">
            {/* Helmet */}
            <Helmet>
                <title>Sign In | LearnHive</title>
            </Helmet>

            {/* Login Card */}
            <div className="max-w-md mx-auto">
                {/* Logo/Brand Section */}
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold mb-2">
                        Welcome Back
                    </h2>
                    <p>
                        Sign in to continue your learning journey
                    </p>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Social Login - Top Section */}
                    <div className="bg-gray-50 px-8 pt-6 pb-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                            Continue with
                        </h3>
                        <SocialLogin />

                        <div className="relative mt-6">
                            {/* <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div> */}
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-gray-50 text-gray-600">
                                    Or sign in with email
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Login Form */}
                    <div className="px-8 py-6">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaEnvelope className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        {...register("email", { required: "Email is required" })}
                                        className={`block w-full pl-9 pr-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out`}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLock className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input
                                        type={showPassWord ? "text" : "password"}
                                        placeholder="Enter your password"
                                        {...register("password", { required: "Password is required" })}
                                        className={`block w-full pl-9 pr-12 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassWord)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassWord ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                                )}
                                {error.login && (
                                    <p className="mt-1 text-sm text-red-600">{error.login}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 focus:outline-none"
                            >
                                Sign In
                            </button>

                            {/* Sign Up Link */}
                            <p className="text-center text-sm text-gray-600">
                                Don't have an account?{" "}
                                <Link
                                    to="/signUp"
                                    className="font-semibold text-blue-600 hover:text-blue-500 transition duration-150 ease-in-out"
                                >
                                    Create an account
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
