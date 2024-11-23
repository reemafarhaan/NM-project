import React, { useEffect, useState } from 'react';

const AdminPanel = ({ authToken }) => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      const response = await fetch('/api/complaints/all', {
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

  const updateStatus = async (id, status, agentResponse) => {
    const response = await fetch(`/api/complaints/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ status, agentResponse }),
    });

    if (response.ok) {
      alert('Complaint updated');
      setComplaints((prev) =>
        prev.map((complaint) =>
          complaint._id === id ? { ...complaint, status, agentResponse } : complaint
        )
      );
    } else {
      alert('Failed to update complaint');
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <ul>
        {complaints.map((complaint) => (
          <li key={complaint._id}>
            <p><strong>User:</strong> {complaint.user.name} ({complaint.user.email})</p>
            <p>{complaint.description}</p>
            <select
              value={complaint.status}
              onChange={(e) => updateStatus(complaint._id, e.target.value, complaint.agentResponse)}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
            <input
              type="text"
              placeholder="Agent Response"
              value={complaint.agentResponse || ''}
              onChange={(e) => updateStatus(complaint._id, complaint.status, e.target.value)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
