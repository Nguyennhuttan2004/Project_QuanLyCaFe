import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './../../css/supCustomer.css/'; // Thêm file CSS để tùy chỉnh giao diện
import { Button } from '@/components/ui/button';

function SupportCustomer() {
    const [supportRequests, setSupportRequests] = useState([]);

    useEffect(() => {
        const fetchSupportRequests = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/support');
                setSupportRequests(response.data);
            } catch (error) {
                console.error('Error fetching support requests:', error);
            }
        };

        fetchSupportRequests();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/support/${id}`);
            setSupportRequests(supportRequests.filter(request => request._id !== id));
        } catch (error) {
            console.error('Error deleting support request:', error);
        }
    };

    return (
        <div className="support-customer-container">
            <h1 className="text-4xl leading-8 text-[#A67C6D] font-bold text-center my-5 uppercase tracking-wide mb-10">Yêu cầu hỗ trợ</h1>
            <table className="support-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {supportRequests.map(request => (
                        <tr key={request._id}>
                            <td>{request.name}</td>
                            <td>{request.email}</td>
                            <td>{request.message}</td>
                            <td>{new Date(request.createdAt).toLocaleString()}</td>
                            <td>
                                <Button onClick={() => handleDelete(request._id)} className="btn">Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SupportCustomer;