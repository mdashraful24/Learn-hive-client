import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FaMapMarkerAlt, FaEnvelope, FaLinkedin, FaGithub, FaFacebook } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const Contacts = () => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);

    const form = useRef();
    const [status, setStatus] = useState("");
    const [isSending, setIsSending] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();

        setIsSending(true);
        setStatus("");

        emailjs
            .sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                form.current,
                {
                    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
                }
            )
            .then(
                () => {
                    setStatus("Email sent successfully!");
                    form.current.reset();
                },
                (error) => {
                    setStatus("Failed to send message. Please try again.");
                    // console.error("Email sending error:", error);
                }
            )
            .finally(() => {
                setIsSending(false);
            });
    };

    return (
        <div className="container mx-auto min-h-[65vh] mt-7 md:mt-10 mb-16 px-2 md:px-3 lg:px-2.5">
            <Helmet>
                <title>Contact Us | LearnHive</title>
            </Helmet>

            <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl text-center font-extrabold mb-10">Contact Us</h1>
            </div>
            <div>
                {/* Contact Form & Message */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Message Me Section */}
                    <div className="bg-base-200 p-4 md:p-8 rounded-xl shadow-md">
                        <h2 className="text-xl md:text-2xl font-bold mb-4">Contact Us in Another Way</h2>
                        <div className="w-16 border-b-2 border-blue-700 mb-4"></div>
                        <p className="text-sm md:text-base">
                            If you prefer to contact us in another way, please feel free to reach out via <strong className="text-blue-600">LinkedIn, GitHub</strong>, or <strong className="text-blue-600">Facebook</strong>. I'm happy to assist you!
                        </p>

                        {/* Social Icons */}
                        <div className="flex space-x-4 mt-4 text-lg md:text-2xl">
                            <a href="https://github.com/mdashraful24" target="_blank" rel="noopener noreferrer">
                                <FaGithub className="hover:text-blue-600 cursor-pointer" />
                            </a>

                            <a href="https://www.linkedin.com/in/ashraful-islam-ratul/" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin className="hover:text-blue-600 cursor-pointer" />
                            </a>

                            <a href="https://www.facebook.com/ashraful.islam.ratul2k" target="_blank" rel="noopener noreferrer">
                                <FaFacebook className="hover:text-blue-500 cursor-pointer" />
                            </a>
                        </div>

                        <div className="mt-8">
                            <div className="flex items-center gap-1 text-sm md:text-base">
                                <FaMapMarkerAlt className="text-blue-600 hidden md:block" />
                                <h3><strong>Address:</strong> Dhaka, Bangladesh</h3>
                            </div>
                        </div>
                        <div className="mt-2">
                            <div className="flex items-center gap-1 text-sm md:text-base">
                                <FaEnvelope className="text-blue-600 hidden md:block" />
                                <h3><strong>Email:</strong> mdashrafulislam2882@gmail.com</h3>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-base-200 p-4 md:p-8 rounded-xl shadow-md">
                        <h2 className="text-xl md:text-2xl font-bold mb-4">Get In Touch</h2>
                        <div className="w-16 border-b-2 border-blue-700 mb-4"></div>

                        <form ref={form} onSubmit={sendEmail} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="font-medium text-sm">Your Name <sup className="text-red-600 text-sm">*</sup></label>
                                    <input
                                        type="text"
                                        name="user_name"
                                        placeholder="Enter your name"
                                        required
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-medium text-sm">Your Email <sup className="text-red-600 text-sm">*</sup></label>
                                    <input
                                        type="email"
                                        name="user_email"
                                        placeholder="Enter email address"
                                        required
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="font-medium text-sm">Your Message <sup className="text-red-600 text-sm">*</sup></label>
                                <textarea
                                    name="message"
                                    placeholder="Enter your message"
                                    required
                                    className="w-full p-3 border rounded-lg h-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                ></textarea>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isSending}
                                    className="px-6 py-2 rounded-xl w-full md:w-auto relative overflow-hidden bg-blue-600 text-white text-lg font-medium transition-all duration-300 ease-in-out before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-700 before:to-blue-800 before:transition-all before:duration-500 before:-translate-x-full hover:before:translate-x-0 before:z-0 disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    <span className="relative z-10">
                                        {isSending ? "Sending..." : "Send Email"}
                                    </span>
                                </button>
                            </div>
                            {/* <button
                                type="submit"
                                className="btn btn-md w-full md:max-w-32 relative overflow-hidden bg-blue-600 text-white text-lg font-medium transition-all duration-300 ease-in-out before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-700 before:to-blue-800 before:transition-all before:duration-500 before:-translate-x-full hover:before:translate-x-0 before:z-0"
                            >
                                <span className="relative z-10">Send Email</span>
                            </button> */}
                        </form>
                        {/* Status Message */}
                        {status && <p className="mt-3 text-base text-green-600">{status}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contacts;
