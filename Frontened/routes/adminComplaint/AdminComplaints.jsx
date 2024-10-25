import { useEffect, useState } from "react";
import "./AdminComplaints.scss"; // Import the SCSS file

const ComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch complaints from the API
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

  // Update complaint status
  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(
        `http://localhost:8800/api/complaint/${id}/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }), // Ensure this matches the expected structure
          credentials: "include", // Include cookies for authentication
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update complaint status");
      }

      // Optionally refetch complaints after updating status
      fetchComplaints();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  if (loading) {
    return <div className="loading">Loading complaints...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="flex justify-center items-start mt-24 min-h-screen">
      <div className="w-full max-w-2xl p-4">
        <h1 className="text-center text-gray-800">Complaints</h1>
        <ul className="list-none p-0">
          {complaints.map((complaint) => (
            <li
              key={complaint.id}
              className="flex justify-between mb-5 border border-gray-300 rounded p-2 bg-gray-100 transition-shadow hover:shadow-lg"
            >
              <div className="flex-grow mr-5">
                <h3 className="text-blue-600">{complaint.title}</h3>
                <p>{complaint.description}</p>
                <p className="text-gray-600">User: {complaint.user.name}</p>
              </div>
              <div className="flex items-center">
                <label
                  htmlFor={`status-${complaint.id}`}
                  className="mr-2 text-gray-800"
                >
                  Status:
                </label>
                <select
                  id={`status-${complaint.id}`}
                  value={complaint.status}
                  onChange={(e) => updateStatus(complaint.id, e.target.value)}
                  className="dropdown"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="RESOLVED">RESOLVED</option>
                </select>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ComplaintsPage;
