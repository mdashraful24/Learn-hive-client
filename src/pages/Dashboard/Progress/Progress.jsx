import { useLoaderData } from "react-router-dom";
import useCount from "../../../hooks/useCount";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Helmet } from "react-helmet-async";

const Progress = () => {
    const { totalEnrollment } = useCount();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const loaderData = useLoaderData();
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    // Simulate data loading
    useEffect(() => {
        setTimeout(() => {
            setData(loaderData);
            setIsLoading(false);
        }, 1000);
    }, [loaderData]);

    // Handle page change
    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    if (isLoading) {
        return (
            <div className="container mx-auto text-center mt-10">
                <p className="">Loading progress details...</p>
            </div>
            // <div className="flex items-center justify-center min-h-screen">
            //     <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
            // </div>
        );
    }

    // Calculate paginated assignments
    const paginatedAssignments = data.assignments.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    return (
        <div className="py-5 mt-10 lg:mt-0 mb-14">
            <Helmet>
                <title>Progress Details | LearnHive</title>
            </Helmet>

            {/* title */}
            <h2 className="text-3xl font-bold mb-4">Progress Details</h2>

            {/* Image */}
            <div className="mb-4">
                <img
                    src={data.image}
                    alt={data.title}
                    className="w-full h-60 md:h-96 rounded-lg shadow-md"
                />
            </div>

            {/* Main Details */}
            <div className="mb-4">
                <p>
                    <strong>Title:</strong> {data.title}
                </p>
                <p>
                    <strong>Description:</strong> {data.description}
                </p>
            </div>

            {/* Assignments Section */}
            {data.assignments.length > 0 ? (
                <>
                    <p className="mb-2">
                        <strong>Enrollments:</strong> {totalEnrollment ?? 'N/A'}
                    </p>
                    <p className="mb-3">
                        <strong>Total Assignments:</strong>{" "}
                        {data.assignments.length}
                    </p>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="">
                                    <th className="border border-gray-300 px-4 py-2">
                                        Title
                                    </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                        Description
                                    </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                        Deadline
                                    </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                        Submitted
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedAssignments.map(
                                    (assignment, index) => (
                                        <tr
                                            key={index}
                                            className="hover:bg-gray-100 text-center capitalize"
                                        >
                                            <td className="border border-gray-300 px-4 py-2">
                                                {assignment.title}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {assignment.description}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {assignment.deadline}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {assignment.submit === "false"
                                                    ? "Yes"
                                                    : "No"}
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="mt-10 flex flex-col md:flex-row justify-center md:justify-between items-center gap-3">
                        <div>
                            <span className="">Page {currentPage + 1} of {Math.ceil(data.assignments.length / itemsPerPage)}</span>
                        </div>
                        <div>
                            <ReactPaginate
                                previousLabel={
                                    <button className="px-3 py-1 rounded-l-lg">
                                        Prev
                                    </button>
                                }
                                nextLabel={
                                    <button className="px-3 py-1 rounded-r-lg">
                                        Next
                                    </button>
                                }
                                pageCount={Math.ceil(data.assignments.length / itemsPerPage)}
                                onPageChange={handlePageChange}
                                containerClassName="flex items-center space-x-2"
                                pageClassName="px-3 py-1 border border-gray-300 rounded"
                                activeClassName="bg-blue-500 text-white"
                                disabledClassName="cursor-not-allowed"
                            />
                        </div>
                    </div>
                </>
            ) : (
                // Relevant message when no assignments are available
                <p className="text-center font-semibold mt-10">
                    No progress available at the moment. Please check back later.
                </p>
            )}
        </div>
    );
};

export default Progress;








// Reserve code
// import { useLoaderData } from "react-router-dom";
// import useCount from "../../../hooks/useCount";
// import { useState } from "react";
// import ReactPaginate from "react-paginate";
// import { Helmet } from "react-helmet-async";

// const Progress = () => {
//     const { totalEnrollment } = useCount();
//     const data = useLoaderData();

//     // Pagination state
//     const [currentPage, setCurrentPage] = useState(0);
//     const itemsPerPage = 10;

//     // Calculate paginated assignments
//     const paginatedAssignments = data.assignments.slice(
//         currentPage * itemsPerPage,
//         (currentPage + 1) * itemsPerPage
//     );

//     // Handle page change
//     const handlePageChange = (selectedPage) => {
//         setCurrentPage(selectedPage.selected);
//     };

//     return (
//         <div className="p-5 mt-10 lg:mt-0 mb-14">
//             <Helmet>
//                 <title>Progress Details | LearnHive</title>
//             </Helmet>

//             {/* title */}
//             <h2 className="text-3xl font-bold mb-4">Progress Details</h2>

//             {/* Image */}
//             <div className="mb-4">
//                 <img
//                     src={data.image}
//                     alt={data.title}
//                     className="w-full h-72 rounded-lg shadow-md"
//                 />
//             </div>

//             {/* Main Details */}
//             <div className="mb-4">
//                 <p>
//                     <strong>Title:</strong> {data.title}
//                 </p>
//                 <p>
//                     <strong>Description:</strong> {data.description}
//                 </p>
//             </div>

//             {/* Assignments Section */}
//             {data.assignments.length > 0 ? (
//                 <>
//                     <h3 className="text-xl font-semibold mb-2">Assignments</h3>
//                     <p className="mb-2">
//                         <strong>Enrollments:</strong> {totalEnrollment}
//                     </p>
//                     <p className="mb-3">
//                         <strong>Total Assignments:</strong>{" "}
//                         {data.assignments.length}
//                     </p>

//                     {/* Table */}
//                     <div className="overflow-x-auto">
//                         <table className="table-auto w-full border-collapse border border-gray-300">
//                             <thead>
//                                 <tr className="bg-gray-200">
//                                     <th className="border border-gray-300 px-4 py-2">
//                                         Title
//                                     </th>
//                                     <th className="border border-gray-300 px-4 py-2">
//                                         Description
//                                     </th>
//                                     <th className="border border-gray-300 px-4 py-2">
//                                         Deadline
//                                     </th>
//                                     <th className="border border-gray-300 px-4 py-2">
//                                         Submitted
//                                     </th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {paginatedAssignments.map(
//                                     (assignment, index) => (
//                                         <tr
//                                             key={index}
//                                             className="hover:bg-gray-100 text-center capitalize"
//                                         >
//                                             <td className="border border-gray-300 px-4 py-2">
//                                                 {assignment.title}
//                                             </td>
//                                             <td className="border border-gray-300 px-4 py-2">
//                                                 {assignment.description}
//                                             </td>
//                                             <td className="border border-gray-300 px-4 py-2">
//                                                 {assignment.deadline}
//                                             </td>
//                                             <td className="border border-gray-300 px-4 py-2">
//                                                 {assignment.submit === "true"
//                                                     ? "Yes"
//                                                     : "No"}
//                                             </td>
//                                         </tr>
//                                     )
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>

//                     {/* Pagination Controls */}
//                     <div className="mt-10 flex flex-col md:flex-row justify-center md:justify-between items-center gap-3">
//                         <div>
//                             <span className="text-gray-800">Page {currentPage + 1} of {Math.ceil(data.assignments.length / itemsPerPage)}</span>
//                         </div>
//                         <div>
//                             <ReactPaginate
//                                 previousLabel={
//                                     <button className="px-3 py-1 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-l-lg">
//                                         Prev
//                                     </button>
//                                 }
//                                 nextLabel={
//                                     <button className="px-3 py-1 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-r-lg">
//                                         Next
//                                     </button>
//                                 }
//                                 pageCount={Math.ceil(data.assignments.length / itemsPerPage)}
//                                 onPageChange={handlePageChange}
//                                 containerClassName="flex items-center space-x-2"
//                                 pageClassName="px-3 py-1 border border-gray-300 rounded"
//                                 activeClassName="bg-blue-500 text-white"
//                                 disabledClassName="cursor-not-allowed"
//                             />
//                         </div>
//                     </div>
//                 </>
//             ) : (
//                 // Relevant message when no assignments are available
//                 <p className="text-gray-600 text-center mt-10">
//                     No progress available at the moment. Please check back later.
//                 </p>
//             )}
//         </div>
//     );
// };

// export default Progress;
