import { useEffect, useState } from "react";
import "./AdminComplaints.scss"; // Custom SCSS if needed

const ComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("PENDING");
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term

  const fetchComplaints = async () => {
    try {
      const response = await fetch("http://localhost:8800/api/complaint/get", {
        method: "GET",
        credentials: "include",
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

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(
        `http://localhost:8800/api/complaint/${id}/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update complaint status");
      }
      fetchComplaints();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Filter complaints by status and search term
  const filteredComplaints = complaints.filter((complaint) => {
    const matchesStatus = complaint.status === activeTab;
    const matchesSearch =
      (complaint.description &&
        complaint.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      (complaint.user &&
        complaint.user.name &&
        complaint.user.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  if (loading) return <div className="loading">Loading complaints...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">COMPLAINTS</h1>
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by description or user"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-1/3"
        />
      </div>

      {/* Tabs for Status Selection */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("PENDING")}
          className={`px-4 py-2 rounded ${
            activeTab === "PENDING" ? "bg-red-100 text-red-800" : "bg-gray-200"
          }`}
        >
          Pending ({complaints.filter((c) => c.status === "PENDING").length})
        </button>
        <button
          onClick={() => setActiveTab("IN_PROGRESS")}
          className={`px-4 py-2 rounded ${
            activeTab === "IN_PROGRESS"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-200"
          }`}
        >
          In Progress (
          {complaints.filter((c) => c.status === "IN_PROGRESS").length})
        </button>
        <button
          onClick={() => setActiveTab("RESOLVED")}
          className={`px-4 py-2 rounded ${
            activeTab === "RESOLVED"
              ? "bg-green-100 text-green-800"
              : "bg-gray-200"
          }`}
        >
          Resolved ({complaints.filter((c) => c.status === "RESOLVED").length})
        </button>
      </div>

      {/* Complaint List for Active Tab */}
      <div className="bg-white shadow rounded-lg p-4 space-y-4">
        {filteredComplaints.map((complaint) => (
          <div
            key={complaint.id}
            className={`border p-3 rounded-md flex items-center justify-between ${
              activeTab === "RESOLVED"
                ? "bg-green-100 border-green-200"
                : activeTab === "IN_PROGRESS"
                ? "bg-yellow-100 border-yellow-200"
                : "bg-red-100 border-red-200"
            }`}
          >
            <div>
              <h3 className="font-semibold">{complaint.category}</h3>{" "}
              {/* Use category as title */}
              <p className="text-gray-600 text-sm">{complaint.description}</p>
              <p className="text-gray-500 text-xs">
                User: {complaint.user ? complaint.user.username : "Unknown"}{" "}
                {/* Access username correctly */}
              </p>
            </div>

            {/* Status Dropdown on the Right */}
            <details className="dropdown dropdown-end">
              <summary className="btn btn-sm btn-outline">
                {complaint.status}
              </summary>
              <ul className="dropdown-content menu p-2 shadow bg-white bg-opacity-100 rounded-box w-40 text-gray-700">
                <li>
                  <a onClick={() => updateStatus(complaint.id, "PENDING")}>
                    Pending
                  </a>
                </li>
                <li>
                  <a onClick={() => updateStatus(complaint.id, "IN_PROGRESS")}>
                    In Progress
                  </a>
                </li>
                <li>
                  <a onClick={() => updateStatus(complaint.id, "RESOLVED")}>
                    Resolved
                  </a>
                </li>
              </ul>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplaintsPage;
