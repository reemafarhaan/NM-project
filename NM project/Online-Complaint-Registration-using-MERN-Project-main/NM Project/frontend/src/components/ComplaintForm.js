import React, { useState } from 'react';

const ComplaintForm = ({ authToken }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/complaints', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ description }),
    });

    if (response.ok) {
      alert('Complaint submitted!');
      setDescription('');
    } else {
      alert('Failed to submit complaint');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Describe your complaint"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">Submit Complaint</button>
    </form>
  );
};

export default ComplaintForm;
