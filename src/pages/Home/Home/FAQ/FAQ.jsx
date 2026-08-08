import { Helmet } from "react-helmet-async";
import { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqData = [
    {
        q: "How can I enroll in a class?",
        a: "Sign up, browse available classes, and click 'Enroll' on the class detail page.",
    },
    {
        q: "What payment methods are supported?",
        a: "We accept credit and debit card payments securely through Stripe.",
    },
    {
        q: "Is my payment information secure?",
        a: "Yes. Payments are securely processed by Stripe, and we do not store your card details on our servers.",
    },
    {
        q: "How do I access my enrolled classes?",
        a: "After successful enrollment, you can access your classes from your dashboard and start learning anytime.",
    },
    {
        q: "Can I become a teacher on LearnHive?",
        a: "Yes. Registered users can apply to become teachers and share their knowledge by creating and managing classes.",
    },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const faqContainerRef = useRef(null);
    const faqItemsRef = useRef([]);

    const toggle = (idx) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    // Close FAQ when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the click is outside the entire FAQ section
            if (faqContainerRef.current && !faqContainerRef.current.contains(event.target)) {
                setOpenIndex(null);
            }
        };

        // Use a slight delay to handle click events properly
        const handleDocumentClick = (event) => {
            // If click is on the toggle button or inside the FAQ, ignore
            if (faqContainerRef.current && faqContainerRef.current.contains(event.target)) {
                return;
            }
            setOpenIndex(null);
        };

        document.addEventListener("mousedown", handleDocumentClick);
        return () => {
            document.removeEventListener("mousedown", handleDocumentClick);
        };
    }, []);

    // Close FAQ when pressing Escape key
    useEffect(() => {
        const handleEscapeKey = (event) => {
            if (event.key === "Escape") {
                setOpenIndex(null);
            }
        };

        document.addEventListener("keydown", handleEscapeKey);
        return () => {
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, []);

    return (
        <section className="container mx-auto mb-20 md:mb-24 px-2 md:px-3 lg:px-2.5"
        >
            <Helmet>
                <title>FAQ | LearnHive</title>
                <meta name="description" content="Frequently asked questions about LearnHive platform, enrollment, payments, refunds and trial periods." />
            </Helmet>
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8">
                Frequently Asked Questions
            </h2>
            <div
                ref={faqContainerRef}
                className="grid gap-4 max-w-5xl mx-auto">
                {faqData.map((item, idx) => (
                    <div
                        key={idx}
                        ref={(el) => (faqItemsRef.current[idx] = el)}
                        className="bg-base-200 bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-xl shadow hover:shadow-md hover:shadow-blue-200 overflow-hidden transition-all duration-200"
                    >
                        <button
                            onClick={() => toggle(idx)}
                            className="w-full flex justify-between items-center p-4 text-left focus:outline-none transition-colors duration-150"
                        >
                            <span className="text-lg font-medium pr-4">
                                {item.q}
                            </span>
                            <span className={`flex-shrink-0 ml-4 transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : 'rotate-0'
                                }`}>
                                <FaChevronDown className="text-gray-500 dark:text-gray-400" />
                            </span>
                        </button>
                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                        >
                            <div className="px-4 pb-4 leading-relaxed">
                                {item.a}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQ;
