import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FaMapMarkerAlt, FaEnvelope, FaLinkedin, FaGithub, FaFacebook } from "react-icons/fa";

const Contacts = () => {
    const form = useRef();
    const [status, setStatus] = useState("");

    const sendEmail = (e) => {
        e.preventDefault();

        const formData = new FormData(form.current);
        const formObject = Object.fromEntries(formData.entries());

        // console.log("Form Data:", formObject);

        emailjs.sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            form.current,
            {
                publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
            }
        ).then(
            () => {
                setStatus("Email sent successfully!");
                form.current.reset();
            },
            (error) => {
                setStatus("Failed to send message. Please try again.");
                console.error("Email sending error:", error);
            }
        );
    };

    return (
        <div className="container mx-auto mb-20 md:mb-32 px-2 md:px-3 lg:px-2.5">
            <div>
                <h1 className="text-2xl md:text-4xl text-center font-extrabold mb-10">Contact Us</h1>
            </div>
            <div>
                {/* Contact Form & Message */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Contact Form */}
                    <div className="bg-base-200 p-4 md:p-8 rounded-xl shadow-md">
                        <h2 className="text-xl md:text-2xl font-bold mb-4">Get In Touch</h2>
                        <div className="w-16 border-b-2 border-blue-700 mb-4"></div>

                        <form ref={form} onSubmit={sendEmail} className="space-y-4">
                            <input
                                type="text"
                                name="user_name"
                                placeholder="Enter your name"
                                required
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1"
                            />
                            <input
                                type="email"
                                name="user_email"
                                placeholder="Enter email address"
                                required
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1"
                            />
                            <textarea
                                name="message"
                                placeholder="Enter your message"
                                required
                                className="w-full p-3 border rounded-lg h-28 focus:outline-none focus:ring-1"
                            ></textarea>
                            <button
                                type="submit"
                                className="btn btn-md w-full md:max-w-32 relative overflow-hidden bg-blue-600 text-white text-lg font-medium transition-all duration-300 ease-in-out
                                    before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-700 before:to-blue-800 before:transition-all before:duration-500 before:-translate-x-full hover:before:translate-x-0 before:z-0"
                            >
                                <span className="relative z-10">Send Email</span>
                            </button>
                        </form>
                        {/* Status Message */}
                        {status && <p className="mt-3 text-base text-green-600">{status}</p>}
                    </div>

                    {/* Message Me Section */}
                    <div className="bg-base-200 p-4 md:p-8 rounded-xl shadow-md">
                        <h2 className="text-xl md:text-2xl font-bold mb-4">Contact Us in Another Way</h2>
                        <div className="w-16 border-b-2 border-blue-700 mb-4"></div>
                        <p className="text-sm md:text-base">
                            If you prefer to contact us in another way, please feel free to reach out via <strong className="text-blue-600">LinkedIn, GitHub</strong>, or <strong className="text-blue-600">Facebook</strong>. I'm happy to assist you!
                        </p>

                        {/* Social Icons */}
                        <div className="flex space-x-4 mt-4 text-lg md:text-2xl text-gray-600">
                            <a href="https://github.com/mdashraful24" target="_blank" rel="noopener noreferrer">
                                <FaGithub className="hover:text-black cursor-pointer" />
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
                </div>
            </div>
        </div>
    );
};

export default Contacts;
