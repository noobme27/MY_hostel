import "./complaint.scss";
import { useState } from "react";

const Complaint = ({ onClose, position }) => {
  const [complaintType, setComplaintType] = useState("");
  const [complaintDescription, setComplaintDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleComplaintSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log("Submitting complaint:", {
      description: complaintDescription,
      category: complaintType,
    });

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
      onClose(); // Close the complaint form after submission
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("Failed to submit complaint. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="complaint-box"
      style={{
        position: "absolute", // Ensure absolute positioning
        top: position.top,
        left: position.left,
        zIndex: 9999, // Ensure it appears on top
      }}
    >
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
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default Complaint;
