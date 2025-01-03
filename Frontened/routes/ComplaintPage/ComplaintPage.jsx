import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./../../context/AuthContext"; // Adjust the import path accordingly
import "./complaintPage.scss"; // Custom SCSS if needed

const ComplaintPage = () => {
  const { currentUser } = useContext(AuthContext); // Get current user from context
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("PENDING");
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [complaintType, setComplaintType] = useState("");
  const [complaintDescription, setComplaintDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown open/close

  // Check if currentUser exists and retrieve the user ID
  const currentUserId = currentUser ? currentUser.id : null;

  const fetchComplaints = async () => {
    if (!currentUserId) return; // Avoid fetching if no user is logged in

    try {
      const response = await fetch(
        `http://localhost:8800/api/complaint/get/${currentUserId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch complaints");
      }
      const data = await response.json();
      console.log(data);
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
  }, [currentUserId]); // Dependency on currentUserId to refetch if it changes

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

  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev); // Toggle dropdown state
  };

  const handleOptionSelect = (option) => {
    // If the selected option is the current complaint type, deselect it
    setComplaintType((prev) => (prev === option ? "" : option));
    setDropdownOpen(false); // Close dropdown after selection
  };

  const handleDropdownClose = () => {
    setDropdownOpen(false);
  };

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

      {/* Complaint Form */}
      <form onSubmit={handleComplaintSubmit} className="mb-6">
        {/* Dropdown for Complaint Type */}
        <div className="relative mb-4">
          <button
            onClick={handleDropdownToggle}
            className="select select-bordered w-full flex justify-between items-center"
          >
            {complaintType || "Select Complaint Type"}
            <span>{dropdownOpen ? "▲" : "▼"}</span>
          </button>
          {dropdownOpen && (
            <ul className="absolute z-10 dropdown-content menu p-2 shadow bg-white rounded-box w-full text-gray-700">
              {["TOILET", "WATER", "ELECTRICITY"].map((type) => (
                <li key={type}>
                  <a onClick={() => handleOptionSelect(type)}>{type}</a>
                </li>
              ))}
            </ul>
          )}
        </div>

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
              <h3 className="font-semibold">{complaint.category}</h3>{" "}
              {/* Display the complaint category */}
              <p className="text-gray-600 text-sm">{complaint.description}</p>
              <p className="text-gray-500 text-xs">
                User: {complaint.user ? complaint.user.username : "Unknown"}{" "}
                {/* Use username from the user object */}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplaintPage;
