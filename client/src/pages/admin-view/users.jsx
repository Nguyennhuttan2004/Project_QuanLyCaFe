import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setUsers,
  setStatus,
  setError,
} from "../../../store/admin/user-slice/index.js";
import "./../../css/user.css"; // Thêm file CSS để tùy chỉnh giao diện
import { Button } from "@/components/ui/button.jsx";
import { useToast } from "@/hooks/use-toast"; // Assuming you have a toast hook

function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.adminUser.users);
  const status = useSelector((state) => state.adminUser.status);
  const error = useSelector((state) => state.adminUser.error);
  const { toast } = useToast(); // Use toast for notifications

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch(setStatus("loading"));
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/users",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(setUsers(response.data));
        dispatch(setStatus("succeeded"));
      } catch (err) {
        dispatch(setError(err.message));
        dispatch(setStatus("failed"));
      }
    };

    fetchUsers();
  }, [dispatch]);

  const handleDelete = async (id) => {
    const userToDelete = users.find((user) => user._id === id);
    if (userToDelete && userToDelete.role === "admin") {
      alert("Không thể xóa người dùng có role là admin.");
      return; // Ngừng thực hiện nếu là admin
    }
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      dispatch(setStatus("loading"));
      try {
        await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // Cập nhật lại danh sách người dùng
        dispatch(setUsers(users.filter((user) => user._id !== id))); // Sử dụng user.id
        dispatch(setStatus("succeeded"));
        toast({
          title: "User deleted successfully.",
          variant: "success",
        });
      } catch (err) {
        dispatch(setError(err.message));
        dispatch(setStatus("failed"));
        toast({
          title: "Cannot delete a user with successful orders.",
          variant: "destructive",
        });
      }
    }
  };

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  // Sắp xếp danh sách người dùng để admin lên đầu
  const sortedUsers = [...users].sort((a, b) => {
    if (a.role === "admin" && b.role !== "admin") return -1;
    if (a.role !== "admin" && b.role === "admin") return 1;
    return 0;
  });

  return (
    <div className="user-list">
      <h1 className="text-4xl leading-8 text-[#A67C6D] font-bold text-center my-5 uppercase tracking-wide mb-10">
        User List
      </h1>
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
          {sortedUsers.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td
                className={`font-bold p-2 rounded ${
                  user.role === "admin"
                    ? "bg-red-200 text-red-800"
                    : "bg-green-200 text-green-800"
                }`}
              >
                {user.role}
              </td>
              <td>
                {user.avatar ? (
                  <img src={user.avatar} alt="" className="avatar" />
                ) : (
                  <div className="no-avatar">No Avatar</div>
                )}
              </td>
              <td>
                <Button className="btn " onClick={() => handleDelete(user._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
