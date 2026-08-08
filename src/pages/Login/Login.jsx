import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUserShield, FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
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
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    // Quick Login Function
    const handleQuickLogin = async (email, password, role) => {
        setLoading(true);
        setError({});
        try {
            const result = await signIn(email, password);
            const user = result.user;
            setUser(user);

            Swal.fire({
                title: `Welcome ${role}!`,
                text: `Logged in as ${role}`,
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
            });
            navigate(from, { replace: true });
        } catch (err) {
            setError({ login: "Please check your email or password." });
            toast.error("Login Failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Submit Form
    const onSubmit = async (data) => {
        setLoading(true);
        setError({});
        try {
            const result = await signIn(data.email, data.password);
            const user = result.user;
            setUser(user);

            Swal.fire({
                title: `Welcome "${user?.displayName || user?.email}"`,
                text: `Hello, ${user?.displayName || user?.email}`,
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
            });
            navigate(from, { replace: true });
        } catch (err) {
            setError({ login: "Please check your email or password." });
            toast.error("Login Failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Quick login accounts
    const quickAccounts = [
        {
            role: "Admin",
            email: "admin@gmail.com",
            password: "123456As",
            icon: <FaUserShield className="text-blue-600" />,
            bgColor: "bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40",
            textColor: "text-blue-700 dark:text-blue-400",
        },
        {
            role: "Teacher",
            email: "jihad@islam.com",
            password: "123456As",
            icon: <FaChalkboardTeacher className="text-green-600" />,
            bgColor: "bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/40",
            textColor: "text-green-700 dark:text-green-400",
        },
        {
            role: "Student",
            email: "rakib25@gmail.com",
            password: "123456As",
            icon: <FaUserGraduate className="text-purple-600" />,
            bgColor: "bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-900/40",
            textColor: "text-purple-700 dark:text-purple-400",
        },
    ];

    return (
        <div className="min-h-[90vh] pt-8 pb-16 px-3">
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
                <div className="rounded-2xl shadow-xl border overflow-hidden">
                    {/* Quick Login Buttons */}
                    <div className="px-8 pt-6 pb-4 border-b">
                        <h3 className="text-sm font-semibold mb-3 text-center">
                            Quick Login
                        </h3>
                        <div className="grid grid-cols-3 gap-2">
                            {quickAccounts.map((account) => (
                                <button
                                    key={account.role}
                                    onClick={() => handleQuickLogin(account.email, account.password, account.role)}
                                    disabled={loading}
                                    className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 ${account.bgColor} ${account.textColor} border-2 border-transparent hover:border-current disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    <span className="text-2xl mb-1">{account.icon}</span>
                                    <span className="text-sm font-medium">{account.role}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Social Login - Top Section */}
                    <div className="px-8 pt-4 pb-6 border-b">
                        <h3 className="text-sm font-semibold mb-4 text-center">
                            Or continue with
                        </h3>
                        <SocialLogin />

                        <div className="relative mt-6">
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4">
                                    Or sign in with email
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Login Form */}
                    <div className="px-8 py-6">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
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
                                        className={`block w-full pl-9 pr-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out dark:bg-gray-700 dark:text-white`}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
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
                                        className={`block w-full pl-9 pr-12 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out dark:bg-gray-700 dark:text-white`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassWord)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
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

                            {/* Submit Button with Loading State */}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 focus:outline-none transition-all duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Signing In...
                                    </span>
                                ) : (
                                    "Sign In"
                                )}
                            </button>

                            {/* Sign Up Link */}
                            <p className="text-center text-sm">
                                Don't have an account?{" "}
                                <Link
                                    to="/signUp"
                                    className="font-semibold text-blue-500 hover:text-blue-400 transition duration-150 ease-in-out"
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
