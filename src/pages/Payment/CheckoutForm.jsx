// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAuth from "../../hooks/useAuth";

// const CheckoutForm = ({ price, paymentDetails }) => {
//     const [errorMessage, setErrorMessage] = useState('');
//     const [clientSecret, setClientSecret] = useState('');
//     const [transactionId, setTransactionId] = useState('');
//     const [isProcessing, setIsProcessing] = useState(false);

//     const stripe = useStripe();
//     const elements = useElements();
//     const axiosSecure = useAxiosSecure();
//     const { user } = useAuth();
//     const navigate = useNavigate();

//     // Fetch the client secret for payment
//     useEffect(() => {
//         console.log("Price passed to useEffect:", price); // Log price
//         if (price > 0) {
//             axiosSecure.post('/create-payment-intent', { price })
//                 .then(res => {
//                     console.log("Received client secret:", res.data.clientSecret); // Log client secret
//                     setClientSecret(res.data.clientSecret);
//                 })
//                 .catch(error => {
//                     console.error("Error creating payment intent:", error);
//                 });
//         }
//     }, [axiosSecure, price]);

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         console.log("Submit clicked, isProcessing:", isProcessing); // Log the status of isProcessing

//         if (!stripe || !elements) {
//             setErrorMessage("Stripe is not initialized.");
//             return;
//         }

//         const cardElement = elements.getElement(CardElement);

//         if (!cardElement) {
//             setErrorMessage("Card element is not available.");
//             return;
//         }

//         setIsProcessing(true);
//         setErrorMessage('');

//         try {
//             const { error, paymentMethod } = await stripe.createPaymentMethod({
//                 type: 'card',
//                 card: cardElement,
//             });

//             console.log("Payment method created:", paymentMethod); // Log the created payment method

//             if (error) {
//                 setErrorMessage(error.message);
//                 setIsProcessing(false);
//                 return;
//             }

//             // Confirm the payment
//             const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
//                 payment_method: {
//                     card: cardElement,
//                     billing_details: {
//                         email: user?.email || 'anonymous',
//                         name: user?.displayName || 'anonymous',
//                     },
//                 },
//             });

//             console.log("Payment intent confirmation:", paymentIntent); // Log payment intent

//             if (confirmError) {
//                 setErrorMessage(confirmError.message);
//                 setIsProcessing(false);
//                 return;
//             }

//             if (paymentIntent.status === 'succeeded') {
//                 setTransactionId(paymentIntent.id);
//                 console.log("Payment successful, transaction ID:", paymentIntent.id); // Log transaction ID

//                 // Save payment details to the database
//                 // const paymentData = {
//                 //     email: user?.email,
//                 //     price,
//                 //     transactionId: paymentIntent.id,
//                 //     date: new Date(),
//                 //     ...paymentDetails, // Include any additional payment-related data
//                 //     status: 'pending',
//                 // };
//                 const paymentData = {
//                     email: user?.email,
//                     price,
//                     transactionId: paymentIntent.id,
//                     date: new Date(),
//                     ...paymentDetails,
//                     totalEnrolment: (paymentDetails.totalEnrolment || 0) + 1,
//                     status: 'pending',
//                 };


//                 const res = await axiosSecure.post('/payments', paymentData);
//                 console.log("Payment data response:", res.data);

//                 if (res.data?.paymentResult?.insertedId) {
//                     Swal.fire({
//                         icon: "success",
//                         title: "Thank you for your payment!",
//                         showConfirmButton: false,
//                         timer: 1500,
//                     });
//                     navigate('/dashboard/my-enroll');
//                 }
//             }
//         } catch (error) {
//             console.error("Payment error:", error);
//             setErrorMessage("An unexpected error occurred. Please try again.");
//         } finally {
//             console.log("Processing finished."); // Log after payment process is finished
//             setIsProcessing(false);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <CardElement
//                 options={{
//                     style: {
//                         base: {
//                             fontSize: '16px',
//                             color: '#424770',
//                             '::placeholder': {
//                                 color: '#aab7c4',
//                             },
//                         },
//                         invalid: {
//                             color: '#9e2146',
//                         },
//                     },
//                 }}
//             />
//             <div className="flex flex-col justify-center items-center gap-3 min-h-60 mt-4">
//                 <button
//                     className={`btn bg-[#570DF8] hover:bg-[#3e04bc] text-white w-1/2 flex justify-center ${isProcessing ? "opacity-50 cursor-not-allowed" : ""
//                         }`}
//                     type="submit"
//                     disabled={!stripe || !clientSecret || isProcessing}
//                 >
//                     {isProcessing ? "Processing..." : "Pay"}
//                 </button>
//                 {errorMessage && <p className="text-red-500">{errorMessage}</p>}
//                 {transactionId && (
//                     <p>
//                         Your Transaction Id:{" "}
//                         <span className="text-green-600">{transactionId}</span>
//                     </p>
//                 )}
//             </div>
//         </form>
//     );
// };

// export default CheckoutForm;




import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const CheckoutForm = ({ price, paymentDetails }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    // Fetch the client secret for payment
    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
                .catch(error => {
                    console.error("Error creating payment intent:", error);
                });
        }
    }, [axiosSecure, price]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            setErrorMessage("Stripe is not initialized.");
            return;
        }

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            setErrorMessage("Card element is not available.");
            return;
        }

        setIsProcessing(true);
        setErrorMessage('');

        try {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (error) {
                setErrorMessage(error.message);
                setIsProcessing(false);
                return;
            }

            // Confirm the payment
            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        email: user?.email || 'anonymous',
                        name: user?.displayName || 'anonymous',
                    },
                },
            });

            if (confirmError) {
                setErrorMessage(confirmError.message);
                setIsProcessing(false);
                return;
            }

            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id); // This will not reset the button state as long as isProcessing is still true

                // Save payment details to the database
                const paymentData = {
                    email: user?.email,
                    price,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    ...paymentDetails,
                    totalEnrolment: (paymentDetails.totalEnrolment || 0) + 1,
                    status: 'pending',
                };

                const res = await axiosSecure.post('/payments', paymentData);

                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: "Thank you for your payment!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    navigate('/dashboard/my-enroll');
                }
            }
        } catch (error) {
            setErrorMessage("An unexpected error occurred. Please try again.");
            setIsProcessing(false);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <div className="flex flex-col justify-center items-center gap-3 min-h-60 mt-4">
                <button
                    className={`btn bg-[#570DF8] hover:bg-[#3e04bc] text-white w-1/2 flex justify-center ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
                    type="submit"
                    disabled={!stripe || !clientSecret || isProcessing}
                >
                    {isProcessing ? "Processing..." : "Pay"}
                </button>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                {transactionId && (
                    <p>
                        Your Transaction Id:{" "}
                        <span className="text-green-600">{transactionId}</span>
                    </p>
                )}
            </div>
        </form>
    );
};

export default CheckoutForm;
