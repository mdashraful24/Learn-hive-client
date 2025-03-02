import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const OrderPage = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    // Fetch orders for the logged-in student
    const { data: classes = [], isLoading, refetch } = useQuery({
        queryKey: ["order", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        },
    });

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = classes.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(classes.length / itemsPerPage);

    // Function to generate and download a uniquely styled invoice
    const downloadInvoice = (order) => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();

        // Add company logo (Replace URL with your logo)
        const logoUrl = "https://i.ibb.co.com/HJNrYrg/logo.png";
        doc.addImage(logoUrl, "PNG", 15, 10, 15, 15);

        // Title - Invoice Header
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.text("Invoice", pageWidth / 2, 20, { align: "center", margin: "bottom" });

        // Invoice details
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`Invoice Date: ${new Date(order.date).toLocaleDateString()}`, 15, 50);
        doc.text(`Invoice No: ${order.transactionId}`, 15, 60);
        doc.text(`Student Email: ${order.email}`, 15, 70);
        doc.text(`Status: ${order.status}`, 15, 80);

        // autoTable
        autoTable(doc, {
            startY: 90,
            head: [["Class Title", "Instructor", "Price"]],
            body: [[order.title, order.name, `$${order.price}`]],
            theme: "striped",
            headStyles: { fillColor: [0, 122, 255] },
            styles: { fontSize: 11, cellPadding: 5 },
        });

        // Footer
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text("Thank you for your purchase!", pageWidth / 2, doc.internal.pageSize.getHeight() - 20, {
            align: "center",
        });

        // Save PDF
        doc.save(`Invoice_${order.transactionId}.pdf`);
    };

    // Function to handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Function to go to the previous page
    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Function to go to the next page
    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Function to generate pagination buttons
    const renderPagination = () => {
        const paginationButtons = [];
        const maxButtons = 5;

        // Always show the first page button
        paginationButtons.push(
            <button
                key={1}
                onClick={() => handlePageChange(1)}
                className={`px-3 py-1 mx-1 rounded-md ${currentPage === 1 ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                    }`}
            >
                1
            </button>
        );

        // Show ellipsis if current page is far from the first page
        if (currentPage > maxButtons) {
            paginationButtons.push(<span key="ellipsis-start">...</span>);
        }

        // Show buttons around the current page
        for (let i = Math.max(2, currentPage - 2); i <= Math.min(totalPages - 1, currentPage + 2); i++) {
            paginationButtons.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-3 py-1 mx-1 rounded-md ${currentPage === i ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                        }`}
                >
                    {i}
                </button>
            );
        }

        // Show ellipsis if current page is far from the last page
        if (currentPage < totalPages - (maxButtons - 1)) {
            paginationButtons.push(<span key="ellipsis-end">...</span>);
        }

        // Always show the last page button if there is more than one page
        if (totalPages > 1) {
            paginationButtons.push(
                <button
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    className={`px-3 py-1 mx-1 rounded-md ${currentPage === totalPages ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                        }`}
                >
                    {totalPages}
                </button>
            );
        }

        return paginationButtons;
    };

    return (
        <div className="mt-3">
            <h2 className="text-xl md:text-3xl text-center font-extrabold mb-4">My Orders</h2>

            {isLoading ? (
                <div className="flex min-h-screen justify-center items-center">
                    <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : classes.length === 0 ? (
                <div className="flex min-h-screen justify-center items-center">
                    <p>No orders found.</p>
                </div>
            ) : (
                <div>
                    <div className="overflow-x-auto rounded-t-lg">
                        <table className="min-w-full shadow-md rounded-lg">
                            <thead className="bg-blue-500 text-white">
                                <tr>
                                    <th className="py-2 px-4">Image</th>
                                    <th className="py-2 px-4">Class Title</th>
                                    <th className="py-2 px-4">Instructor</th>
                                    <th className="py-2 px-4">Price</th>
                                    <th className="py-2 px-4">Transaction ID</th>
                                    <th className="py-2 px-4">Student Email</th>
                                    <th className="py-2 px-4">Status</th>
                                    <th className="py-2 px-4">Invoice</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((order) => (
                                    <tr key={order._id} className="border-l border-r border-b text-center hover:bg-base-200">
                                        <td className="py-2 px-4">
                                            <img src={order.image} alt={order.title} className="w-12 h-12 rounded-md mx-auto" />
                                        </td>
                                        <td className="py-2 px-4">{order.title}</td>
                                        <td className="py-2 px-4">{order.name}</td>
                                        <td className="py-2 px-4">${order.price}</td>
                                        <td className="py-2 px-4">{order.transactionId}</td>
                                        <td className="py-2 px-4">{order.email}</td>
                                        <td className="py-2 px-4 capitalize">{order.status}</td>
                                        <td className="py-2 px-4">
                                            <button
                                                onClick={() => downloadInvoice(order)}
                                                className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                                            >
                                                Download
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-5 mt-7">
                        {/* Page Number Display */}
                        <div>
                            Page {currentPage} of {totalPages}
                        </div>

                        <div className="flex items-center">
                            {/* Previous Button */}
                            <button
                                onClick={goToPreviousPage}
                                disabled={currentPage === 1}
                                className={`px-3 py-1 mx-1 rounded-md ${currentPage === 1 ? "bg-base-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
                                    }`}
                            >
                                Prev
                            </button>

                            {/* Pagination Buttons */}
                            <span className="text-black">{renderPagination()}</span>

                            {/* Next Button */}
                            <button
                                onClick={goToNextPage}
                                disabled={currentPage === totalPages}
                                className={`px-3 py-1 mx-1 rounded-md ${currentPage === totalPages ? "bg-base-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
                                    }`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderPage;