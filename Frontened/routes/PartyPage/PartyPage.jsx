import React, { useEffect, useState } from "react";
import "./partyPage.scss";

const PartyPage = () => {
  const [parties, setParties] = useState([]);
  const [filteredParties, setFilteredParties] = useState([]);
  const [newParty, setNewParty] = useState({
    title: "",
    description: "",
    capacity: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("title");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParties = async () => {
      try {
        const response = await fetch("http://localhost:8800/api/party/all");
        if (!response.ok) throw new Error("Failed to fetch parties");

        const data = await response.json();
        setParties(data);
        setFilteredParties(data);
      } catch (err) {
        console.error("Error fetching parties:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchParties();
  }, []);

  const handleCreateParty = async () => {
    // Your existing party creation logic
  };

  const handleJoinParty = async (partyId) => {
    // Your existing join party logic
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    if (term === "") setFilteredParties(parties);
    else {
      const filtered = parties.filter((party) =>
        searchType === "title"
          ? party.title.toLowerCase().includes(term)
          : party.description.toLowerCase().includes(term)
      );
      setFilteredParties(filtered);
    }
  };

  return (
    <div className="party-page min-h-screen p-6 bg-gray-100 text-black flex gap-8">
      {/* Create Party Section on the Left */}
      <div className="bg-white p-6 rounded-lg shadow-md w-1/3 max-w-lg">
        <h2 className="text-2xl font-bold text-yellow-600 mb-4">
          Create a Party
        </h2>
        <div className="form-control space-y-4">
          <input
            type="text"
            placeholder="Party Title"
            className="input input-bordered border-gray-300"
            value={newParty.title}
            onChange={(e) =>
              setNewParty({ ...newParty, title: e.target.value })
            }
          />
          <textarea
            placeholder="Description"
            className="textarea textarea-bordered border-gray-300"
            value={newParty.description}
            onChange={(e) =>
              setNewParty({ ...newParty, description: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Capacity"
            className="input input-bordered border-gray-300"
            value={newParty.capacity}
            onChange={(e) =>
              setNewParty({ ...newParty, capacity: Number(e.target.value) })
            }
          />
          <button
            className="btn bg-yellow-500 text-white w-full"
            onClick={handleCreateParty}
          >
            Create Party
          </button>
        </div>
      </div>

      {/* Available Parties Section on the Right */}
      <div className="w-2/3">
        <h2 className="text-2xl font-bold text-yellow-600 mb-4">
          Available Parties
        </h2>

        {/* Search Bar */}
        <div className="form-control w-full max-w-xs mb-6">
          <select
            className="select select-bordered border-gray-300 mb-2"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="title">Search by Title</option>
            <option value="description">Search by Description</option>
          </select>
          <input
            type="text"
            placeholder={`Search by ${searchType}...`}
            className="input input-bordered border-gray-300"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {/* Party Listings */}
        <div className="space-y-4">
          {filteredParties.map((party) => (
            <div key={party.id} className="card bg-white shadow-lg rounded-lg">
              <div className="card-body">
                <h3 className="card-title text-lg font-semibold text-black">
                  {party.title}
                </h3>
                <p className="text-gray-600">{party.description}</p>
                <p className="text-gray-500 text-sm">
                  {party.attendees.length}/{party.capacity} attending
                </p>
                <button
                  className="btn btn-sm bg-yellow-500 text-white mt-2"
                  onClick={() => handleJoinParty(party.id)}
                >
                  Join
                </button>

                {/* Attendee Dropdown */}
                <details className="dropdown mt-2">
                  <summary className="btn btn-sm btn-outline text-black">
                    View Attendees
                  </summary>
                  <div className="dropdown-content bg-gray-50 p-4 shadow-lg w-full rounded-lg">
                    {party.attendees && party.attendees.length > 0 ? (
                      <ul className="list-disc list-inside space-y-1 text-black">
                        {party.attendees.map((attendee) => (
                          <li key={attendee.id}>{attendee.name}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">No attendees yet.</p>
                    )}
                  </div>
                </details>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartyPage;
