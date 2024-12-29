import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from '../src/pages/Login';
import AdminPanel from '../src/pages/AdminPanel';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        await axios.get('/api/auth/verify', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsLoggedIn(true);
      } catch {
        localStorage.removeItem('token');
      }
    };
    checkToken();
  }, []);

  if (!isLoggedIn) return <Login onLogin={() => setIsLoggedIn(true)} />;
  return <AdminPanel />;
}
