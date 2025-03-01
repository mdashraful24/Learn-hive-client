import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import useCount from "../../hooks/useCount";
import { Helmet } from "react-helmet-async";

const DetailsPage = () => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);

    const { totalEnrollment } = useCount();
    const { _id, title, name, price, description, image } = useLoaderData();

    return (
        <div className="md:max-w-3xl lg:max-w-2xl mx-auto px-2 md:px-3 lg:px-2.5 pt-10 pb-20">
            <Helmet>
                <title>Class Details | LearnHive</title>
            </Helmet>

            <h1 className="text-2xl md:text-4xl font-extrabold text-center mb-8">Class Details</h1>
            <div className="shadow-md rounded-xl border overflow-hidden">
                {/* Class Image */}
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full lg:object-cover"
                />

                <div className="p-6">
                    {/* Class Details */}
                    <h2 className="text-lg md:text-2xl font-bold mb-4">
                        {title}
                    </h2>
                    <p className="mb-4">
                        <strong>Posted By:</strong> {name}
                    </p>
                    <p className="text-justify mb-4">
                        <strong>Description:</strong> {description}
                    </p>
                    <p className="mb-4">
                        <strong>Enrollments:</strong> {totalEnrollment ?? 'N/A'}
                    </p>
                    <p className="font-bold mb-6">
                        Total Price: <span className="text-blue-500">${price}</span>
                    </p>

                    {/* Pay Button */}
                    <Link
                        to={`/payment/${_id}`}
                        className="btn btn-primary w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                    >
                        Pay Now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;








// import { useLoaderData, useNavigate } from "react-router-dom";

// const DetailsPage = () => {
//     // Destructure data from useLoaderData
//     const { _id, title, name, price, description, image } = useLoaderData();

//     // Use React Router's useNavigate hook
//     const navigate = useNavigate();

//     // Handle the Pay button click
//     const handlePayment = () => {
//         // Navigate to the payment page and pass necessary data
//         console.log("Navigating with price:", price);  // Log to ensure price is correct
//         navigate(`/payment/${_id}`, {
//             state: { title, price, description, name, image },
//         });
//     };

//     return (
//         <div className="max-w-2xl mx-auto px-4 py-8">
//             <div className="bg-white shadow-md rounded-lg overflow-hidden">
//                 {/* Class Image */}
//                 <img
//                     src={image}
//                     alt={title}
//                     className="w-full h-64 object-cover"
//                 />

//                 <div className="p-6">
//                     {/* Class Details */}
//                     <h2 className="text-2xl font-bold text-gray-800 mb-4">
//                         {title}
//                     </h2>
//                     <p className="text-gray-600 mb-4">
//                         <strong>Instructor:</strong> {name}
//                     </p>
//                     <p className="text-gray-600 mb-4">
//                         <strong>Description:</strong> {description}
//                     </p>
//                     <p className="text-gray-800 font-bold text-lg mb-6">
//                         Price: ${price}
//                     </p>

//                     {/* Pay Button */}
//                     <button
//                         onClick={handlePayment}
//                         className="btn btn-primary w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
//                     >
//                         Pay Now
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DetailsPage;