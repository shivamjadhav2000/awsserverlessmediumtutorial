import React, { useState } from 'react';

const Form = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setProfileImage(null);
      setPreviewImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const baseUrl = 'your api gateway url here';
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    console.log(profileImage);
    if (profileImage) {
      formData.append('filePath', profileImage);
    }
    const data = await fetch(`${baseUrl}`, {
      method: 'POST',
      body: formData,
    }).then(res => res.json()).catch(err => console.error(err));
    console.log("data = ", data);
    if (data) {
      setFirstName('');
      setLastName('');
      setProfileImage(null);
      setPreviewImage(null);
      setMessage(data?.message || 'Form submitted successfully');
    }

  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="firstName" className="block mb-2 font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block mb-2 font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="profileImage" className="block mb-2 font-medium text-gray-700">
            Profile Image
          </label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            onChange={handleProfileImageChange}
          />
          {previewImage && (
            <img src={previewImage} alt="Profile Preview" className="mt-2 w-32 h-32 object-cover rounded-md" />
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{ opacity: loading ? 0.5 : 1 }}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
        >
          {loading ? '...' : 'Submit'}
        </button>
      </form>
      {message && (
        <div className="mt-4 p-4 bg-blue-500 text-white rounded-md">
          {message}
        </div>
      )}
    </div>
  );
};

export default Form;