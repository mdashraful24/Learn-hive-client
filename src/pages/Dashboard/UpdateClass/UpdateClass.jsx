import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const UpdateClass = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [classDetails, setClassDetails] = useState({
        title: '',
        description: '',
        price: ''
    });

    useEffect(() => {
        const fetchClassDetails = async () => {
            try {
                const res = await axiosSecure.get(`/classes/${id}`);
                setClassDetails(res.data);
            } catch (error) {
                Swal.fire("Error", "Failed to fetch class details. Try again later.", "error");
            }
        };
        fetchClassDetails();
    }, [id, axiosSecure]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setClassDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleUpdateClass = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosSecure.put(`/classes/${id}`, classDetails);
            if (res.status === 200) {
                Swal.fire("Success", "Class updated successfully!", "success");
                navigate('/dashboard/my-classes');
            } else {
                throw new Error("Failed to update class");
            }
        } catch (error) {
            Swal.fire("Error", "Failed to update class. Try again later.", "error");
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-center mb-8">Update Class</h2>
            <form onSubmit={handleUpdateClass} className="max-w-md mx-auto">
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Class Title</label>
                    <input
                        type="text"
                        name="title"
                        value={classDetails.title}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Class Description</label>
                    <textarea
                        name="description"
                        value={classDetails.description}
                        onChange={handleInputChange}
                        className="textarea textarea-bordered w-full"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={classDetails.price}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="btn btn-primary">
                        Update Class
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateClass;
