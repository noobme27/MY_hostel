import React, { useEffect, useState } from "react";
import "./partyPage.scss"; // Import the SCSS styles

const PartyPage = () => {
  const [parties, setParties] = useState([]);
  const [filteredParties, setFilteredParties] = useState([]);
  const [newParty, setNewParty] = useState({
    title: "",
    description: "",
    capacity: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("title"); // State for search type (title or description)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authToken, setAuthToken] = useState(null); // State for storing the auth token

  // Fetch parties when the component mounts
  useEffect(() => {
    const fetchParties = async () => {
      try {
        const response = await fetch("http://localhost:8800/api/party/all");
        if (!response.ok) {
          throw new Error("Failed to fetch parties");
        }
        const data = await response.json();
        setParties(data);
        setFilteredParties(data); // Initialize filtered parties with all parties
      } catch (err) {
        console.error("Error fetching parties:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchParties();
  }, []);

  // Retrieve the token from cookies (or wherever you store it)
  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find(row => row.startsWith("token="))
      ?.split("=")[1];
    
    if (token) {
      setAuthToken(token);
    }
  }, []);

  // Handle party creation
  const handleCreateParty = async () => {
    try {
      const response = await fetch('http://localhost:8800/api/party/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include credentials (cookies)
        body: JSON.stringify(newParty), // Send the new party data
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create party');
      }
  
      const data = await response.json();
      setParties((prevParties) => [...prevParties, data]);
      setFilteredParties((prevFiltered) => [...prevFiltered, data]); // Update filtered parties
      setNewParty({ title: "", description: "", capacity: 0 }); // Reset the form
    } catch (err) {
      setError(err.message); // Set the error message
      console.error("Error creating party:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;   
  
  // Handle party joining
  const handleJoinParty = async (partyId) => {
    try {
      const response = await fetch(`http://localhost:8800/api/party/join/${partyId}`, {
        method: 'POST',
        credentials: 'include', // Include credentials (cookies)
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ partyId }), // Send the party ID in the body
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error joining party:', errorData);
        throw new Error('Failed to join party');
      }
  
      const data = await response.json();
      console.log('Success:', data);
      
      // Show success alert
      alert("You have successfully joined this party!");
      
      // Refresh the page to show updated participant count
      window.location.reload();
    } catch (error) {
      console.error('Error joining party:', error);
    }
  };

  // Handle search/filtering
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === "") {
      setFilteredParties(parties); // Reset to all parties if search is empty
      return;
    }

    const filtered = parties.filter((party) => {
      // Determine the match based on selected search type
      return searchType === "title"
        ? party.title.toLowerCase().includes(term)
        : party.description.toLowerCase().includes(term);
    });

    setFilteredParties(filtered); // Update filtered parties based on search
  };

  return (
    <div className="lay">
      <div className="party-container">
        <h1>Create a Party</h1>
        <div className="create-party-form">
          <input
            type="text"
            placeholder="Title"
            value={newParty.title}
            onChange={(e) =>
              setNewParty({ ...newParty, title: e.target.value })
            }
          />
          <textarea
            placeholder="Description"
            value={newParty.description}
            onChange={(e) =>
              setNewParty({ ...newParty, description: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Capacity"
            value={newParty.capacity}
            onChange={(e) =>
              setNewParty({ ...newParty, capacity: Number(e.target.value) })
            }
          />
          <button onClick={handleCreateParty}>Create Party</button>
        </div>
  
        {/* Display error message here if present */}
        {error && <div style={{ color: 'red' }}>{error}</div>} 
  
        <h1>Available Parties</h1>
  
        <div className="search-container">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="title">Search by Title</option>
            <option value="description">Search by Description</option>
          </select>
  
          <input
            type="text"
            placeholder={`Search by ${searchType}...`}
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
  
        <ul className="party-list">
          {filteredParties.map((party) => (
            <li key={party.id}>
              <h2>{party.title}</h2>
              <p>{party.description}</p>
              <p>
                {Array.isArray(party.attendees) ? party.attendees.length : 0}/{party.capacity} attending
              </p>
              <button onClick={() => handleJoinParty(party.id)}>Join</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PartyPage;
