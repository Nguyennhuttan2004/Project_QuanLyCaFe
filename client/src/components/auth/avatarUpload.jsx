// client/src/components/auth/AvatarUpload.jsx
import React from 'react';
import axios from 'axios';

const AvatarUpload = ({ onUpload }) => {
  const uploadAvatar = async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/avatar', formData, {
        withCredentials: true,
      });
      console.log(response.data);
      // Call the onUpload function with the new avatar URL
      onUpload(response.data.data.imgUrl); // Assuming the response contains the new image URL
    } catch (error) {
      console.error("Error uploading avatar:", error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadAvatar(file);
    }
  };

  return (
    <div>
      <h2>Upload Avatar</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
    </div>
  );
};

export default AvatarUpload;