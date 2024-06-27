import React, { useState, useEffect } from 'react';
import useFetch from '../../Hooks/useFetch';

const SettingPage = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [editMode, setEditMode] = useState({
    userName: false,
    email: false,
    password: false,
  });

  const [passwordChange, setPasswordChange] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const { sendRequest } = useFetch();

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUserData = async () => {
      try {
        const responseData = await sendRequest(
          '/api/users/getLoggedInUserDetails',
          'GET',
          null,
          {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you store token in localStorage
          }
        );
        const { name, email } = responseData.user;
        setUserName(name);
        setEmail(email);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setMessage('Error fetching user data');
      }
    };

    fetchUserData();
  }, [sendRequest]);

  const handleUserNameChange = (e) => setUserName(e.target.value);
  const handlePasswordChange = (e) => setPasswordChange({
    ...passwordChange,
    [e.target.name]: e.target.value,
  });
  const handleEmailChange = (e) => setEmail(e.target.value);

  const toggleEditMode = (field) => {
    setEditMode(prevState => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!userName || !email) {
      setMessage('Please fill out all fields.');
      return;
    }

    if (!validateEmail(email)) {
      setMessage('Please enter a valid email.');
      return;
    }

    if (editMode.password && (passwordChange.newPassword !== passwordChange.confirmPassword)) {
      setMessage('New passwords do not match.');
      return;
    }

    try {
      // Simulate an API call to update user settings
      await sendRequest(
        '/api/users/updateUserDetails',
        'PUT',
        JSON.stringify({
          name: userName,
          email: email,
          oldPassword: passwordChange.oldPassword,
          newPassword: passwordChange.newPassword,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you store token in localStorage
        }
      );

      setMessage('Settings updated successfully!');
      setEditMode({
        userName: false,
        email: false,
        password: false,
      });
      setPasswordChange({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Error updating user settings:', error);
      setMessage('Error updating user settings');
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 border border-gray-300 rounded-lg font-sans">
      <h1 className="text-2xl mb-6 text-gray-800">Settings</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="userName" className="block text-gray-700 font-bold mb-2">Username:</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={handleUserNameChange}
              disabled={!editMode.userName}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800"
            />
            <button
              type="button"
              onClick={() => toggleEditMode('userName')}
              className="px-3 py-2 bg-gray-700 text-white rounded-md"
            >
              {editMode.userName ? 'Save' : 'Edit'}
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email:</label>
          <div className="flex items-center gap-2">
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              disabled={!editMode.email}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800"
            />
            <button
              type="button"
              onClick={() => toggleEditMode('email')}
              className="px-3 py-2 bg-gray-700 text-white rounded-md"
            >
              {editMode.email ? 'Save' : 'Edit'}
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password:</label>
          {!editMode.password ? (
            <button
              type="button"
              onClick={() => toggleEditMode('password')}
              className="px-3 py-2 bg-gray-700 text-white rounded-md"
            >
              Change Password
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <input
                type="password"
                name="oldPassword"
                placeholder="Old Password"
                value={passwordChange.oldPassword}
                onChange={handlePasswordChange}
                required
                className="px-3 py-2 border border-gray-300 rounded-md text-gray-800"
              />
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={passwordChange.newPassword}
                onChange={handlePasswordChange}
                required
                className="px-3 py-2 border border-gray-300 rounded-md text-gray-800"
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
                value={passwordChange.confirmPassword}
                onChange={handlePasswordChange}
                required
                className="px-3 py-2 border border-gray-300 rounded-md text-gray-800"
              />
              <button
                type="button"
                onClick={() => toggleEditMode('password')}
                className="px-3 py-2 bg-gray-500 text-white rounded-md"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-gray-800 text-white rounded-md"
        >
          Update Settings
        </button>
      </form>
      {message && <p className="mt-4 px-3 py-2 bg-green-100 border border-green-300 rounded-md text-gray-800">{message}</p>}
    </div>
  );
};

export default SettingPage;
