import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ComplaintForm from './components/ComplaintForm';
import ComplaintList from './components/ComplaintList';
import AdminPanel from './components/AdminPanel';

const App = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || '');
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('isAdmin');
    setAuthToken('');
    setIsAdmin(false);
  };

  return (
    <Router>
      <div>
        <header>
          <nav>
            <a href="/">Home</a>
            {!authToken && <a href="/login">Login</a>}
            {!authToken && <a href="/register">Register</a>}
            {authToken && !isAdmin && <a href="/submit-complaint">Submit Complaint</a>}
            {authToken && !isAdmin && <a href="/track-complaints">Track Complaints</a>}
            {authToken && isAdmin && <a href="/admin-panel">Admin Panel</a>}
            {authToken && <button onClick={handleLogout}>Logout</button>}
          </nav>
        </header>
        <main>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Navigate to={authToken ? "/track-complaints" : "/login"} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login setAuthToken={setAuthToken} />} />
            
            {/* Protected Routes for Users */}
            {authToken && !isAdmin && (
              <>
                <Route
                  path="/submit-complaint"
                  element={<ComplaintForm authToken={authToken} />}
                />
                <Route
                  path="/track-complaints"
                  element={<ComplaintList authToken={authToken} />}
                />
              </>
            )}

            {/* Protected Routes for Admin */}
            {authToken && isAdmin && (
              <Route path="/admin-panel" element={<AdminPanel authToken={authToken} />} />
            )}

            {/* Redirect if no valid route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
