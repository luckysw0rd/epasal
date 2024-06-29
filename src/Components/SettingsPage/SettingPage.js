import React, { useState, useEffect, useContext } from 'react';
import useFetch from '../../Hooks/useFetch';
import { AuthContext } from '../../Hooks/AuthContext';

const SettingPage = () => {
  const [userName, setUserName] = useState('');
  const auth = useContext(AuthContext);
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
          'users/getLoggedInUserDetails',
          'GET',
          null,
          {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.token,
          }
        );
        const { name, email } = responseData.user;
        setUserName(name);
        setEmail(email);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [sendRequest, auth.token]);

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
    console.log("submiting")
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
      // Prepare the request body
      const requestBody = {
        name: userName,
        email: email,
      };
  
      // Add password fields if in password edit mode
      if (editMode.password) {
        requestBody.oldPassword = passwordChange.oldPassword;
        requestBody.newPassword = passwordChange.newPassword;
      }
  
      // Send the API request
      const response = await sendRequest(
        'users/updateUserDetails',
        'PUT',
        JSON.stringify(requestBody),
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`, // Retrieve token from AuthContext
        }
      );
      console.log(response);
      // Handle success response
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
      // Handle error response
      console.error('Error updating user settings:', error);
      setMessage('Error updating user settings');
    }
  };
  

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-10">
      <div className="max-w-md w-full p-6 bg-gray-100 border border-gray-300 rounded-lg font-sans">
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
                  className="px-3 py-2 border border-gray-300 rounded-md text-gray-800"
                />
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={passwordChange.newPassword}
                  onChange={handlePasswordChange}
                  className="px-3 py-2 border border-gray-300 rounded-md text-gray-800"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm New Password"
                  value={passwordChange.confirmPassword}
                  onChange={handlePasswordChange}
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
    </div>
  );
};

export default SettingPage;
