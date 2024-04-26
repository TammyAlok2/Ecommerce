import React, { useState } from 'react';

const ProfilePage = () => {
  // Initial user data (mocked)
  const [userData, setUserData] = useState({
    username: 'JohnDoe',
    password: '********', // Just to display placeholder
    mobileNumber: '1234567890',
  });

  // State for edited user data
  const [editedUserData, setEditedUserData] = useState({ ...userData });
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData({
      ...editedUserData,
      [name]: value,
    });
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate update request (replace with actual backend call)
    setUserData({ ...editedUserData });
    setOldPassword('');
    setNewPassword('');
    alert('Profile updated successfully!');
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 bg-blue-500 text-white flex items-center justify-center">
          <img
            className="h-24 w-24 rounded-full object-cover border-4 border-white"
            src="https://randomuser.me/api/portraits/men/75.jpg"
            alt="User Avatar"
          />
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4 col-span-2">
                <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
                  Username
                </label>
                <div className="border border-gray-300 rounded-md px-3 py-2">{userData.username}</div>
              </div>
              <div className="mb-4 col-span-2">
                <label htmlFor="oldPassword" className="block text-gray-700 font-bold mb-2">
                  Old Password
                </label>
                <input
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4 col-span-2">
                <label htmlFor="newPassword" className="block text-gray-700 font-bold mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4 col-span-2">
                <label htmlFor="mobileNumber" className="block text-gray-700 font-bold mb-2">
                  Mobile Number
                </label>
                <input
                  type="text"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={editedUserData.mobileNumber}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mt-4"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
