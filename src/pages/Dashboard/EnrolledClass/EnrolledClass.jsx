import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const EnrolledClass = () => {
    const location = useLocation();
    const { assignments = [] } = location.state || {}; // Provide a default value to avoid errors
    const [submissions, setSubmissions] = useState({});

    const handleChange = (e, assignmentId) => {
        const { value } = e.target;
        setSubmissions({
            ...submissions,
            [assignmentId]: value,
        });
    };

    const handleSubmit = (e, assignmentId) => {
        e.preventDefault();
        console.log(`Submitted for assignment ${assignmentId}:`, submissions[assignmentId]);
        // Add your submit logic here, like making an API call
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Assignments</h2>
            {assignments.length > 0 ? (
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Title</th>
                            <th className="py-2 px-4 border-b">Description</th>
                            <th className="py-2 px-4 border-b">Deadline</th>
                            <th className="py-2 px-4 border-b">Submission</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignments.map((assignment) => (
                            <tr key={assignment._id}>
                                <td className="py-2 px-4 border-b">{assignment.title}</td>
                                <td className="py-2 px-4 border-b">{assignment.description}</td>
                                <td className="py-2 px-4 border-b">{assignment.deadline}</td>
                                <td className="py-2 px-4 border-b">
                                    <form onSubmit={(e) => handleSubmit(e, assignment._id)}>
                                        <input
                                            type="text"
                                            placeholder="Enter your submission"
                                            value={submissions[assignment._id] || ''}
                                            onChange={(e) => handleChange(e, assignment._id)}
                                            className="border px-2 py-1 rounded"
                                        />
                                        <button type="submit" className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                            Submit
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No assignments available.</p>
            )}
        </div>
    );
};

export default EnrolledClass;
