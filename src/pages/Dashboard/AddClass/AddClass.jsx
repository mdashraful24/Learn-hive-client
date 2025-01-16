import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Helmet } from "react-helmet-async";

// Cloudinary configuration
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const AddClass = () => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate(); // Initialize useNavigate

    const uploadedImage = watch("image");

    const onSubmit = async (data) => {
        const imageFile = data.image[0];

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
                const classItem = {
                    title: data.title,
                    name: user?.displayName || "Unknown User",
                    email: user?.email || "unknown@example.com",
                    price: parseFloat(data.price),
                    description: data.description,
                    image: cloudinaryData.secure_url,
                    status: "pending",
                };

                const classRes = await axiosSecure.post("/classes", classItem);

                if (classRes.data.insertedId) {
                    reset();
                    Swal.fire({
                        icon: "success",
                        title: `${data.title} class has been added.`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    navigate("/dashboard/my-class"); // Redirect to My Classes page
                }
            }
        } catch (error) {
            console.error("Error uploading image or adding class item:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong! Please try again.",
            });
        }
    };

    return (
        <div className="mb-16">
            <Helmet>
                <title>Add Class || LearnHive</title>
            </Helmet>

            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 md:mb-10">Add a New Class</h2>
            <div className="p-5 md:p-8 shadow-lg rounded-lg border">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Title */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                            Title*
                        </label>
                        <input
                            type="text"
                            placeholder="Class Title"
                            {...register("title", { required: "Title is required" })}
                            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-black"
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                    </div>

                    {/* Name and Email */}
                    <div className="flex gap-4 mb-4">
                        <div className="flex-1">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                type="text"
                                value={user?.displayName || "Unknown User"}
                                disabled
                                className="w-full px-3 py-2 border rounded shadow-sm bg-gray-200 cursor-not-allowed"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="text"
                                value={user?.email || "unknown@example.com"}
                                disabled
                                className="w-full px-3 py-2 border rounded shadow-sm bg-gray-200 cursor-not-allowed"
                            />
                        </div>
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                            Price*
                        </label>
                        <input
                            type="text"
                            placeholder="Price"
                            {...register("price", {
                                required: "Price is required",
                                pattern: {
                                    value: /^[0-9]*\.?[0-9]+$/,
                                    message: "Price must be a valid number",
                                },
                            })}
                            className="px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-black"
                        />
                        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Description*
                        </label>
                        <textarea
                            placeholder="Class Description"
                            rows="4"
                            {...register("description", { required: "Description is required" })}
                            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-black resize-none"
                        ></textarea>
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                    </div>

                    {/* File Upload */}
                    <div className="mb-8">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fileUpload">
                            Upload Image
                        </label>
                        <input
                            type="file"
                            {...register("image", { required: "Image is required" })}
                            className="block text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-300"
                        />
                        {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={!uploadedImage || uploadedImage.length === 0}
                            className="btn w-full flex items-center gap-2 bg-[#835D23] hover:bg-[#835D23] text-white font-bold rounded-none"
                        >
                            Add Class
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddClass;
