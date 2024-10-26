import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./../../context/AuthContext"; // Adjust the import path accordingly
import "./complaintPage.scss"; // Custom SCSS if needed

const ComplaintPage = () => {
  const { currentUser } = useContext(AuthContext); // Get current user from context
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("PENDING");
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term
  const [complaintType, setComplaintType] = useState("");
  const [complaintDescription, setComplaintDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if currentUser exists and retrieve the user ID
  const currentUserId = currentUser ? currentUser.id : null;

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

  const handleComplaintSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "http://localhost:8800/api/complaint/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: complaintDescription,
            category: complaintType,
            userId: currentUserId, // Use the current user's ID
          }),
          credentials: "include", // Send cookies
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit complaint");
      }

      const data = await response.json();
      alert(data.message);
      setComplaintDescription("");
      setComplaintType("");
      fetchComplaints(); // Refresh the complaints after submission
    } catch (error) {
      alert("Failed to submit complaint. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Filter complaints by status, user ID, and search term
  const filteredComplaints = complaints.filter((complaint) => {
    const matchesUser = complaint.userId === currentUserId; // Show only user's complaints
    const matchesStatus = complaint.status === activeTab;
    const matchesSearch =
      (complaint.description &&
        complaint.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      (complaint.user &&
        complaint.user.name &&
        complaint.user.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesUser && matchesStatus && matchesSearch;
  });

  if (loading) return <div className="loading">Loading complaints...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Register Complaint</h1>
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by description or user"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full max-w-xs"
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
          Pending (
          {
            complaints.filter(
              (c) => c.status === "PENDING" && c.userId === currentUserId
            ).length
          }
          )
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
          {
            complaints.filter(
              (c) => c.status === "IN_PROGRESS" && c.userId === currentUserId
            ).length
          }
          )
        </button>
        <button
          onClick={() => setActiveTab("RESOLVED")}
          className={`px-4 py-2 rounded ${
            activeTab === "RESOLVED"
              ? "bg-green-100 text-green-800"
              : "bg-gray-200"
          }`}
        >
          Resolved (
          {
            complaints.filter(
              (c) => c.status === "RESOLVED" && c.userId === currentUserId
            ).length
          }
          )
        </button>
      </div>

      {/* Complaint Form */}
      <form onSubmit={handleComplaintSubmit} className="mb-6">
        {/* Dropdown for Complaint Type */}
        <details className="dropdown dropdown-open mb-4 w-full">
          <summary className="select select-bordered w-full">
            {complaintType || "Select Complaint Type"}
          </summary>
          <ul className="dropdown-content menu p-2 shadow bg-white rounded-box w-full text-gray-700">
            <li>
              <a onClick={() => setComplaintType("TOILET")}>Toilet</a>
            </li>
            <li>
              <a onClick={() => setComplaintType("WATER")}>Water</a>
            </li>
            {/* Add other complaint types as needed */}
          </ul>
        </details>

        {/* Textarea for Complaint Description */}
        <textarea
          className="textarea textarea-bordered w-full mb-4"
          placeholder="Describe your complaint..."
          value={complaintDescription}
          onChange={(e) => setComplaintDescription(e.target.value)}
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Complaint"}
        </button>
      </form>

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
              <h3 className="font-semibold">{complaint.title}</h3>
              <p className="text-gray-600 text-sm">{complaint.description}</p>
              <p className="text-gray-500 text-xs">
                User: {complaint.user.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplaintPage;
