import React, { useState } from 'react';

function LoginPage({ onLogin }) {
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'admin') {
      onLogin();
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-gray-300 p-4 rounded-2xl shadow-lg w-90 space-y-10">
        <h1 className="text-2xl font-bold text-center text-gray-500">
          Login to Construction App
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 text-black"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-900 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;