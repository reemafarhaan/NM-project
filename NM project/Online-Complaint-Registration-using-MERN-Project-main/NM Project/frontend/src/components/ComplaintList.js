import React, { useEffect, useState } from 'react';

const ComplaintList = ({ authToken }) => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      const response = await fetch('/api/complaints', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const data = await response.json();
      if (response.ok) {
        setComplaints(data);
      } else {
        alert('Failed to load complaints');
      }
    };

    fetchComplaints();
  }, [authToken]);

  return (
    <div>
      <h2>Your Complaints</h2>
      <ul>
        {complaints.map((complaint) => (
          <li key={complaint._id}>
            <p><strong>Status:</strong> {complaint.status}</p>
            <p>{complaint.description}</p>
            {complaint.agentResponse && <p><strong>Agent Response:</strong> {complaint.agentResponse}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComplaintList;
