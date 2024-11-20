import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUsers, setStatus, setError } from '../../../store/admin/user-slice/index.js';
import './../../css/user.css'; // Thêm file CSS để tùy chỉnh giao diện
import { Button } from '@/components/ui/button.jsx';

function Users() {
    const dispatch = useDispatch();
    const users = useSelector(state => state.adminUser.users);
    const status = useSelector(state => state.adminUser.status);
    const error = useSelector(state => state.adminUser.error);

    useEffect(() => {
        const fetchUsers = async () => {
            dispatch(setStatus('loading'));
            try {
                const response = await axios.get('http://localhost:5000/api/admin/users', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                dispatch(setUsers(response.data));
                dispatch(setStatus('succeeded'));
            } catch (err) {
                dispatch(setError(err.message));
                dispatch(setStatus('failed'));
            }
        };

        fetchUsers();
    }, [dispatch]);

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
            dispatch(setStatus('loading'));
            try {
                await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                // Cập nhật lại danh sách người dùng
                dispatch(setUsers(users.filter(user => user._id !== id))); // Sử dụng user.id
                dispatch(setStatus('succeeded'));
            } catch (err) {
                dispatch(setError(err.message));
                dispatch(setStatus('failed'));
            }
        }
    };

    if (status === 'loading') return <p>Loading...</p>;
    if (status === 'failed') return <p>Error: {error}</p>;

    return (
        <div className="user-list">
            <h1 className="text-4xl leading-8 text-[#A67C6D] font-bold text-center my-5 uppercase tracking-wide mb-10">User List</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Avatar</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.userName}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                {user.avatar ? (
                                    <img src={user.avatar} alt="" className="avatar" />
                                ) : (
                                    <div className="no-avatar">No Avatar</div>
                                )}
                            </td>
                            <td>
                                <Button className='btn '  onClick={() => handleDelete(user._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Users;