import React, { useState } from 'react';

const Login = ({ setAuthToken }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await fetch('/api/users/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData),
//     });

//     const data = await response.json();
//     if (response.ok) {
//       setAuthToken(data.token);
//       alert('Login successful!');
//     } else {
//       alert(data.message || 'Login failed');
//     }
//   };

const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
  
    const data = await response.json();
    if (response.ok) {
      setAuthToken(data.token);
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('isAdmin', data.isAdmin);
      alert('Login successful!');
    } else {
      alert(data.message || 'Login failed');
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
