// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import LoginPage from './components/LoginPage';
import AppTabs from './components/AppTabs';

function MyApp() {
  const [loggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem('loggedIn') === 'true';
  });

  const loadData = () => {
    
  }

  useEffect(() => {
    loadData();
    if (loggedIn) {
      
    }
  }, [loggedIn]);

  const handleLogin = () => {
    localStorage.setItem('loggedIn', 'true');
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      
      {/* Header */}
      <header className="bg-blue-700 text-white p-2 sm:p-4 text-center text-3xl font-bold shadow-md flex justify-center items-center gap-2">
        Construction Dashboard
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-1 sm:p-6 space-y-2 sm:space-y-10">

        {/* Logout Button */}
        <div className="flex justify-end">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Logout
          </button>
        </div>

        <AppTabs onReload={loadData} />

      </main>

      {/* Footer */}
      <footer className="bg-blue-800 text-white p-2 sm:p-4 text-center text-sm">
        © 2026 Construction. All rights reserved.
      </footer>

    </div>
  );
}

export default MyApp;


//import AppTabs from './components/AppTabs';


  // const loadEquipment = () => {
  //   fetchEquipment()
  //     .then((res) => setEquipment(res.data))
  //     .catch((err) => console.error(err));
  // };
  

  // const loadData = () => {
  //   loadEquipment();
  //   loadRenters();
  // }

  // useEffect(() => {
  //   loadData();
  //   if (loggedIn) {
  //     loadEquipment();
  //     loadRenters();
  //   }
  // }, [loggedIn]);


  //<img src="/icon-192x192.png" alt="RMT Logo" className="w-10 h-10 animate-bounce" />