import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

// Stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    const { id } = useParams(); // Get the dynamic class ID
    const location = useLocation(); // Access the state passed with navigate

    // Extract necessary data from location.state
    const { title, price, description, name, image } = location.state || {};
    console.log("Received price in Payment:", price);

    if (!location.state) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <h2 className="text-red-600 text-xl">Invalid Payment Details. Please try again.</h2>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-5 lg:px-10 py-10">
            <Helmet>
                <title>Payment | LearnHive</title>
            </Helmet>
            <h2 className="text-3xl font-bold text-center mb-6">Complete Your Payment</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Class Details */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-64 object-cover"
                    />
                    <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">{title}</h3>
                        <p className="text-gray-600 mb-2">
                            <strong>Instructor:</strong> {name}
                        </p>
                        <p className="text-gray-700 mb-4">{description}</p>
                        <p className="text-lg text-green-600 font-bold">
                            Total Price: ${price}
                        </p>
                    </div>
                </div>

                {/* Payment Form */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h4 className="text-lg font-bold mb-4">Payment Details</h4>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm price={price} paymentDetails={{ id, title, description, name, image }} />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;
