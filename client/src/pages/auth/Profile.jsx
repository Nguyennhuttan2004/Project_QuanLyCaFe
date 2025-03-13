import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UploadCloudIcon } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { setUser } from "../../../store/auth-slice";
import { DOMAIN_BE, FOLDER_IMAGE_BE } from "@/lib/constant";
import img from "./../../assets/avatarEmpty.jpg";

function Profile() {
  const { user } = useSelector((state) => state.auth); // Get user info from Redux
  const [avatarPreview, setAvatarPreview] = useState(img); // Start with default image
  const [selectedFile, setSelectedFile] = useState(null);// Track upload status
  const dispatch = useDispatch();

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file)); // Show preview of the selected image
      setSelectedFile(file); // Save the file for upload
    }
  };

  const handleUploadAvatar = async () => {
    if (!selectedFile) {
      alert("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", selectedFile);
    formData.append("userId", user?.id);

    try {
      const response = await fetch("http://localhost:5000/api/upload-avatar", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log({ data });
        alert("Avatar updated successfully!");

        const newAvatarUrl = data.avatar; 
        console.log("New Avatar URL:", newAvatarUrl);

        setAvatarPreview(img); // Update avatarPreview with the new avatar URL
        dispatch(setUser({ ...user, avatar: newAvatarUrl })); 
      } else {
        const error = await response.json();
        alert("Failed to update avatar: " + error.message);
      }
    } catch (error) {
      console.error("Error uploading avatar:", error);
      alert("Error occurred while uploading.");
    }
  };

  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <div className="flex flex-col items-center mb-6">
        <img
          src={`${DOMAIN_BE}${FOLDER_IMAGE_BE}${user?.avatar}`}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-[#D2B79B] mb-4 object-cover"
        />
        <h1 className="text-2xl font-semibold">{user?.userName}</h1>
        <p className="text-gray-600">{user?.email}</p>
        <span className="bg-[#D2B79B] text-white text-xs font-bold py-1 px-2 rounded mt-2">
          Role: {user?.role}
        </span>
      </div>
      <div>
        <img
          src={ avatarPreview } 
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-[#D2B79B] mb-4 object-cover "
        />
      </div>
      <div className="mt-4 w-full mb-10">
        <Label
          htmlFor="image-upload"
          className="flex flex-col items-center justify-center h-32 cursor-pointer border-2 border-dashed border-[#D2B79B] rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
          <UploadCloudIcon className="w-10 h-10 text-[#D2B79B] mb-2" />
          <span className="text-gray-700">
            Drag & drop or click to upload image
          </span>
        </Label>
      </div>
      <div className="flex space-x-4 mt-4 w-full">
        <button
          onClick={handleUploadAvatar}
          className="bg-[#D2B79B] text-white py-2 px-4 rounded-md hover:bg-[#D2B79B] transition w-full"
        >
          Upload Avatar
        </button>
      </div>
    </div>
  );
}

export default Profile;