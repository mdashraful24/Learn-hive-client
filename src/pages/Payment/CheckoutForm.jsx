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
    const [isCardValid, setIsCardValid] = useState(false); // New state to track card validity

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

    // Handle card validity change
    const handleCardChange = (event) => {
        if (event.complete) {
            setIsCardValid(true); // Card is valid
        } else {
            setIsCardValid(false); // Card is invalid
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            const error = "Stripe is not initialized.";
            setErrorMessage(error);
            Swal.fire({
                icon: "error",
                title: "Payment Error",
                text: error,
            });
            return;
        }

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            const error = "Card element is not available.";
            setErrorMessage(error);
            Swal.fire({
                icon: "error",
                title: "Payment Error",
                text: error,
            });
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
                Swal.fire({
                    icon: "error",
                    title: "Payment Error",
                    text: error.message,
                });
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
                Swal.fire({
                    icon: "error",
                    title: "Payment Error",
                    text: "Please try another one",
                    // text: confirmError.message,
                });
                setIsProcessing(false);
                return;
            }

            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id);

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
                    navigate('/dashboard/myEnroll-class');
                }
            }
        } catch (error) {
            const errorMsg = "An unexpected error occurred. Please try again.";
            setErrorMessage(errorMsg);
            Swal.fire({
                icon: "error",
                title: "Payment Error",
                text: errorMsg,
            });
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
                onChange={handleCardChange} // Handle card input changes
            />
            <div className="flex flex-col justify-center items-center gap-3 min-h-60 mt-4">
                <button
                    className={`btn w-full lg:w-2/3 bg-blue-600 hover:bg-blue-700 text-white flex justify-center ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
                    type="submit"
                    disabled={!stripe || !clientSecret || isProcessing || !isCardValid}
                //     <button
                //     className={`btn w-full lg:w-2/3 bg-blue-600 hover:bg-blue-700 text-white flex justify-center ${isProcessing ? "opacity-50 cursor-not-allowed" : ""} disabled:opacity-90 disabled:bg-blue-600 disabled:text-white`}
                //     type="submit"
                //     disabled={!stripe || !clientSecret || isProcessing || !isCardValid} // Disable button if card is invalid
                // >
                //     {isProcessing ? "Processing..." : "Pay"}
                // </button>
                >
                    {isProcessing ? "Processing..." : "Pay"}
                </button>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                {/* {transactionId && (
                    <p>
                        Your Transaction Id:{" "}
                        <span className="text-green-600">{transactionId}</span>
                    </p>
                )} */}
            </div>
        </form>
    );
};

export default CheckoutForm;












// submitted
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
//         if (price > 0) {
//             axiosSecure.post('/create-payment-intent', { price })
//                 .then(res => {
//                     setClientSecret(res.data.clientSecret);
//                 })
//                 .catch(error => {
//                     console.error("Error creating payment intent:", error);
//                 });
//         }
//     }, [axiosSecure, price]);

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         if (!stripe || !elements) {
//             const error = "Stripe is not initialized.";
//             setErrorMessage(error);
//             Swal.fire({
//                 icon: "error",
//                 title: "Payment Error",
//                 text: error,
//             });
//             return;
//         }

//         const cardElement = elements.getElement(CardElement);

//         if (!cardElement) {
//             const error = "Card element is not available.";
//             setErrorMessage(error);
//             Swal.fire({
//                 icon: "error",
//                 title: "Payment Error",
//                 text: error,
//             });
//             return;
//         }

//         setIsProcessing(true);
//         setErrorMessage('');

//         try {
//             const { error, paymentMethod } = await stripe.createPaymentMethod({
//                 type: 'card',
//                 card: cardElement,
//             });

//             if (error) {
//                 setErrorMessage(error.message);
//                 Swal.fire({
//                     icon: "error",
//                     title: "Payment Error",
//                     text: error.message,
//                 });
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

//             if (confirmError) {
//                 setErrorMessage(confirmError.message);
//                 Swal.fire({
//                     icon: "error",
//                     title: "Payment Error",
//                     text: "Please try another one",
//                     // text: confirmError.message,
//                 });
//                 setIsProcessing(false);
//                 return;
//             }

//             if (paymentIntent.status === 'succeeded') {
//                 setTransactionId(paymentIntent.id);

//                 // Save payment details to the database
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

//                 if (res.data?.paymentResult?.insertedId) {
//                     Swal.fire({
//                         icon: "success",
//                         title: "Thank you for your payment!",
//                         showConfirmButton: false,
//                         timer: 1500,
//                     });
//                     navigate('/dashboard/myEnroll-class');
//                 }
//             }
//         } catch (error) {
//             const errorMsg = "An unexpected error occurred. Please try again.";
//             setErrorMessage(errorMsg);
//             Swal.fire({
//                 icon: "error",
//                 title: "Payment Error",
//                 text: errorMsg,
//             });
//         } finally {
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
//                     className={`btn bg-[#570DF8] hover:bg-[#3e04bc] text-white w-1/2 flex justify-center ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
//                     type="submit"
//                     disabled={!stripe || !clientSecret || isProcessing}
//                 >
//                     {isProcessing ? "Processing..." : "Pay"}
//                 </button>
//                 {errorMessage && <p className="text-red-500">{errorMessage}</p>}
//                 {/* {transactionId && (
//                     <p>
//                         Your Transaction Id:{" "}
//                         <span className="text-green-600">{transactionId}</span>
//                     </p>
//                 )} */}
//             </div>
//         </form>
//     );
// };

// export default CheckoutForm;











// reserve code
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
//         if (price > 0) {
//             axiosSecure.post('/create-payment-intent', { price })
//                 .then(res => {
//                     setClientSecret(res.data.clientSecret);
//                 })
//                 .catch(error => {
//                     console.error("Error creating payment intent:", error);
//                 });
//         }
//     }, [axiosSecure, price]);

//     const handleSubmit = async (event) => {
//         event.preventDefault();

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

//             if (confirmError) {
//                 setErrorMessage(confirmError.message);
//                 setIsProcessing(false);
//                 return;
//             }

//             if (paymentIntent.status === 'succeeded') {
//                 setTransactionId(paymentIntent.id);

//                 // Save payment details to the database
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

//                 if (res.data?.paymentResult?.insertedId) {
//                     Swal.fire({
//                         icon: "success",
//                         title: "Thank you for your payment!",
//                         showConfirmButton: false,
//                         timer: 1500,
//                     });
//                     navigate('/dashboard/myEnroll-class');
//                 }
//             }
//         } catch (error) {
//             setErrorMessage("An unexpected error occurred. Please try again or try another one.");
//             setIsProcessing(false);
//         } finally {
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
//                     className={`btn bg-[#570DF8] hover:bg-[#3e04bc] text-white w-1/2 flex justify-center ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
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
