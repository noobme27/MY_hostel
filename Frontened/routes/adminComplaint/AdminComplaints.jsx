import React, { useEffect, useState } from "react";
import "./AdminComplaints.scss"; // Import the SCSS file

const ComplaintsPage = () => {
  // State declarations
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch complaints
  const fetchComplaints = async () => {
    try {
      const response = await fetch("http://localhost:8800/api/complaint/get", {
        method: "GET",
        credentials: "include", // Include cookies for authentication
      });

      if (!response.ok) {
        throw new Error("Failed to fetch complaints");
      }

      const data = await response.json();
      setComplaints(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect to call fetchComplaints on component mount
  useEffect(() => {
    fetchComplaints();
  }, []);

  // Conditional rendering based on state
  if (loading) {
    return <div className="loading">Loading complaints...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="lay">
      <div className="complaints-container">
        <h1>Complaints</h1>
        <ul className="complaint-list">
          {complaints.map((complaint) => (
            <li key={complaint.id} className="complaint-item">
              <h3>{complaint.title}</h3>
              <p>{complaint.description}</p>
              <p>User: {complaint.user.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ComplaintsPage;
