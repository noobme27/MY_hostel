import "./complaintPage.scss";
import { useState } from "react";

const ComplaintPage = () => {
  const [complaintType, setComplaintType] = useState("");
  const [complaintDescription, setComplaintDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleComplaintSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log("Submitting complaint:", {
      description: complaintDescription,
      category: complaintType,
    }); // Debug log

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
          }),
          credentials: "include", // Send cookies
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit complaint");
      }

      const data = await response.json();
      alert(data.message);
      setComplaintDescription("");
      setComplaintType("");
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("Failed to submit complaint. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="lay">
      <div className="complaint-container">
        <h2>Register Complaint</h2>
        <form onSubmit={handleComplaintSubmit}>
          <select
            value={complaintType}
            onChange={(e) => setComplaintType(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Complaint Type
            </option>
            <option value="TOILET">Toilet</option>
            <option value="WATER">Water</option>
            {/* Add other complaint types as needed */}
          </select>
          <textarea
            placeholder="Describe your complaint..."
            value={complaintDescription}
            onChange={(e) => setComplaintDescription(e.target.value)}
            required
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Complaint"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ComplaintPage;
