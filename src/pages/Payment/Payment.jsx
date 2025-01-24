import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";

// Stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    const { _id, title, price, description, name, image } = useLoaderData();

    return (
        <div className="max-w-4xl mx-auto px-5 lg:px-10 py-10 mb-16">
            <Helmet>
                <title>Payment | LearnHive</title>
            </Helmet>
            <h2 className="text-3xl font-bold text-center mb-8">Complete Your Payment</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Class Details */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-64"
                    />
                    <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">{title}</h3>
                        <p className="text-gray-600 mb-2">
                            <strong>Posted By:</strong> {name}
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
                        <CheckoutForm price={price} paymentDetails={{ _id, title, description, name, image }} />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;

