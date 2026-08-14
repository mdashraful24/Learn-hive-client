import logo from '../../../../src/assets/logo.png'
import { FaMapMarkerAlt, FaEnvelope, FaFacebook, FaLinkedin, FaGithub, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { MdOutlineArrowForward } from "react-icons/md";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-black">
            {/* Main Footer */}
            <div className="container mx-auto px-6 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <img src={logo} alt="LearnHive" className="w-12 h-12 object-contain" />
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
                                LearnHive
                            </h2>
                        </div>
                        <p className="text-gray-300 leading-relaxed max-w-sm">
                            At LearnHive we help students with the essential study preparation they need
                            to clear their exam and provide tutors with the performance they deserve.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-6 relative">
                            Quick Links
                            <span className="absolute -bottom-2 left-0 w-10 h-0.5 bg-blue-500"></span>
                        </h3>

                        <ul className="space-y-3">
                            <li>
                                <Link
                                    to="/allClasses"
                                    className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors duration-300 group"
                                >
                                    <span>All Classes</span>
                                    <MdOutlineArrowForward className="text-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/contact"
                                    className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors duration-300 group"
                                >
                                    <span>Contact Us</span>
                                    <MdOutlineArrowForward className="text-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                </Link>
                            </li>

                            {/* Privacy Policy */}
                            <li>
                                <Link
                                    to="/privacy-policy"
                                    className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors duration-300 group"
                                >
                                    <span>Privacy Policy</span>
                                    <MdOutlineArrowForward className="text-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                </Link>
                            </li>

                            {/* Terms & Conditions */}
                            <li>
                                <Link
                                    to="/terms-and-conditions"
                                    className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors duration-300 group"
                                >
                                    <span>Terms & Conditions</span>
                                    <MdOutlineArrowForward className="text-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-6 relative">
                            Contact Info
                            <span className="absolute -bottom-2 left-0 w-10 h-0.5 bg-blue-500"></span>
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3 group">
                                <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-blue-600 transition-colors duration-300">
                                    <FaMapMarkerAlt className="text-blue-500 group-hover:text-white transition-colors duration-300" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Location</p>
                                    <p className="text-gray-300">Dhaka, Bangladesh</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 group">
                                <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-blue-600 transition-colors duration-300">
                                    <FaEnvelope className="text-blue-500 group-hover:text-white transition-colors duration-300" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Email</p>
                                    <a href="mailto:mdashrafulislam2882@gmail.com"
                                        className="text-gray-300 hover:text-blue-400 transition-colors duration-300 break-all">
                                        mdashrafulislam2882@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social Media Section - Improved */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-6 relative">
                            Follow Us
                            <span className="absolute -bottom-2 left-0 w-10 h-0.5 bg-blue-500"></span>
                        </h3>
                        <p className="text-gray-300 text-sm mb-4">Connect with us on social media</p>
                        <div className="grid grid-cols-3 gap-3">
                            <a href="https://www.facebook.com/ashraful.islam.ratul.455820"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center gap-1 p-3 bg-gray-800 rounded-lg hover:bg-blue-600 transition-all duration-300 group">
                                <FaFacebook className="text-2xl text-blue-500 group-hover:text-white transition-colors duration-300" />
                                <span className="text-xs text-white transition-colors duration-300">Facebook</span>
                            </a>
                            <a href="https://www.linkedin.com/in/ashraful-islam-ratul"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center gap-1 p-3 bg-gray-800 rounded-lg hover:bg-blue-700 transition-all duration-300 group">
                                <FaLinkedin className="text-2xl text-blue-400 group-hover:text-white transition-colors duration-300" />
                                <span className="text-xs text-white transition-colors duration-300">LinkedIn</span>
                            </a>
                            <a href="https://github.com/mdashraful24"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center gap-1 p-3 bg-gray-800 rounded-lg hover:bg-gray-600 transition-all duration-300 group">
                                <FaGithub className="text-2xl text-gray-400 group-hover:text-white transition-colors duration-300" />
                                <span className="text-xs text-white transition-colors duration-300">GitHub</span>
                            </a>
                            {/* <a href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center gap-1 p-3 bg-gray-800 rounded-lg hover:bg-blue-400 transition-all duration-300 hover:scale-105 group">
                                <FaTwitter className="text-2xl text-blue-300 group-hover:text-white transition-colors duration-300" />
                                <span className="text-xs text-gray-500 group-hover:text-white transition-colors duration-300">Twitter</span>
                            </a>
                            <a href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center gap-1 p-3 bg-gray-800 rounded-lg hover:bg-pink-600 transition-all duration-300 hover:scale-105 group">
                                <FaInstagram className="text-2xl text-pink-500 group-hover:text-white transition-colors duration-300" />
                                <span className="text-xs text-gray-500 group-hover:text-white transition-colors duration-300">Instagram</span>
                            </a>
                            <a href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center gap-1 p-3 bg-gray-800 rounded-lg hover:bg-red-600 transition-all duration-300 hover:scale-105 group">
                                <FaYoutube className="text-2xl text-red-500 group-hover:text-white transition-colors duration-300" />
                                <span className="text-xs text-gray-500 group-hover:text-white transition-colors duration-300">YouTube</span>
                            </a> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="container mx-auto px-6 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-400">
                            &copy; {new Date().getFullYear()} LearnHive. All rights reserved.
                        </p>
                        <p className="text-sm text-gray-400">
                            Designed, Developed & Maintained by
                            <Link to="https://ashraful-islam-ratul.netlify.app" target="_blank" rel="noopener noreferrer" className="text-blue-400 ml-1 hover:text-blue-300 transition-colors duration-300">
                                Ashraful Islam Ratul
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
