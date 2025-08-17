import React, { useState, useEffect } from 'react';

const App = () => {
  // State for login form
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // State for user profile and authentication
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const API_URL = 'http://localhost:5000/api/v1/auth/signin';

  // Check for existing user token and profile on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem('user_token');
    const storedProfile = localStorage.getItem('user_profile');

    if (storedToken && storedProfile) {
      try {
        const profile = JSON.parse(storedProfile);
        setUserProfile(profile);
        setIsLoggedIn(true);
      } catch (e) {
        console.error("Failed to parse user profile from localStorage", e);
        // Clear invalid data if parsing fails
        localStorage.removeItem('user_token');
        localStorage.removeItem('user_profile');
        setIsLoggedIn(false);
        setUserProfile(null);
      }
    }
  }, []); // The empty dependency array ensures this runs only once on component mount

  const showMessage = (text, type = 'info') => {
    setMessage(text);
    setIsError(type === 'error');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    showMessage('กำลังเข้าสู่ระบบ...', 'info');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Endpoint ไม่ถูกต้อง: กรุณาตรวจสอบ URL ของ API');
        }
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed. Please check your credentials.');
      }

      const data = await response.json();
      console.log('Backend response data:', data);

      if (data.token && data.user) {
        // Save both token and user profile
        localStorage.setItem('user_token', data.token);
        localStorage.setItem('user_profile', JSON.stringify(data.user));

        // Update React state
        setUserProfile(data.user);
        setIsLoggedIn(true);
        showMessage('เข้าสู่ระบบสำเร็จ!', 'success');
      } else {
        throw new Error('Authentication token or user profile not received from the server.');
      }

    } catch (err) {
      console.error('Login error:', err);
      showMessage(`เกิดข้อผิดพลาด: ${err.message}`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_profile');
    setIsLoggedIn(false);
    setUserProfile(null);
    showMessage('ออกจากระบบแล้ว', 'success');
  };

  // Render different views based on login status
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen font-sans">
      <div className="bg-white p-8 rounded-xl shadow-2xl space-y-6 max-w-sm w-full">
        {isLoggedIn ? (
          // Logged-in View
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-gray-800">ยินดีต้อนรับกลับมาครับ!</h1>
            <p className="text-gray-600">
              ชื่อผู้ใช้: <span className="font-semibold text-gray-800">{userProfile?.username || 'N/A'}</span>
            </p>
            {/* You can display other profile data here */}
            <button
              onClick={handleLogout}
              className="w-full py-2 px-4 rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
            >
              ออกจากระบบ
            </button>
          </div>
        ) : (
          // Login Form View
          <>
            <h1 className="text-3xl font-bold text-center text-gray-800">เข้าสู่ระบบ</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">ชื่อผู้ใช้</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">รหัสผ่าน</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 disabled:bg-indigo-400 disabled:cursor-not-allowed"
              >
                {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
              </button>
            </form>
          </>
        )}

        {message && (
          <div
            className={`mt-4 p-3 rounded-lg text-center ${
              isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
