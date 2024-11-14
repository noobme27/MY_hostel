// AddCard.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCard = ({ onAddCard }) => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [company, setCompany] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCard = { name, department, company };
    onAddCard(newCard); // pass card details back to HostelMates
    navigate("/hostel-mates"); // navigate back after submitting
  };

  return (
    <div className="add-card">
      <h2>Add a New Card</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
        <button type="submit">Add Card</button>
      </form>
    </div>
  );
};

export default AddCard;
