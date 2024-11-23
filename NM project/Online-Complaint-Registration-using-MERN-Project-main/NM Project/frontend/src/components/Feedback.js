import React, { useState } from 'react';

const Feedback = ({ complaintId, authToken }) => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/complaints/${complaintId}/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ feedback }),
    });

    if (response.ok) {
      alert('Feedback submitted!');
      setFeedback('');
    } else {
      alert('Failed to submit feedback');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Your feedback"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        required
      />
      <button type="submit">Submit Feedback</button>
    </form>
  );
};

export default Feedback;
