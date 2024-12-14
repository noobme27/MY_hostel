import "./complaint.scss";
import { useState } from "react";
import PropTypes from "prop-types";

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
        "https://backened-7u3h.onrender.com/api/complaint/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: complaintDescription,
            category: complaintType,
          }),
          credentials: "include",
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
        top: position.top,
        left: position.left,
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
      <button className="cancel-button" onClick={onClose}>
        Cancel
      </button>
    </div>
  );
};

Complaint.propTypes = {
  onClose: PropTypes.func.isRequired,
  position: PropTypes.shape({
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
  }).isRequired,
};

export default Complaint;
