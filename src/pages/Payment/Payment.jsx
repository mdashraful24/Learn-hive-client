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
        <div className="md:max-w-4xl lg:max-w-5xl mx-auto px-2 md:px-3 lg:px-2.5 pt-10 pb-20">
            <Helmet>
                <title>Payment | LearnHive</title>
            </Helmet>
            <h2 className="text-2xl md:text-4xl font-extrabold text-center mb-10">Complete Your Payment</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Class Details */}
                <div className="shadow-lg rounded-xl border overflow-hidden">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-64"
                    />
                    <div className="text-justify p-6">
                        <h3 className="text-lg md:text-xl font-bold mb-2">{title}</h3>
                        <p className="mb-2">
                            <strong>Posted By:</strong> {name}
                        </p>
                        <p className="mb-4"><strong>Description:</strong> {description}</p>
                        <p className="font-bold">
                            Total Price: <span className="text-blue-700">${price}</span>
                        </p>
                    </div>
                </div>

                {/* Payment Form */}
                <div className="shadow-lg border rounded-xl p-6">
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

