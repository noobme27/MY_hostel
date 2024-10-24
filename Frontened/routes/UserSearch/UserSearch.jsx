import { useEffect, useState } from "react";
import "./userSearch.scss";

const UserSearchPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchType, setSearchType] = useState("name"); // State for search type

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8800/api/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data); // Initialize filtered users with all users
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === "") {
      // If the search term is empty, reset filtered users to the original list
      setFilteredUsers(users);
      return; // Exit the function early
    }

    const filtered = users.filter((user) => {
      if (user.info && user.info.length > 0) {
        const userInfo = user.info[0]; // Get the first info object

        // Determine the search condition based on the selected search type
        const matchCondition =
          searchType === "name"
            ? userInfo.name
              ? userInfo.name.toLowerCase().includes(term)
              : false
            : userInfo.hostel
            ? userInfo.hostel.toLowerCase().includes(term)
            : false;

        return matchCondition; // Return match result based on the selected type
      }
      return false; // No match if info is empty
    });

    setFilteredUsers(filtered);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="user-search-page">
      <h1>User Search</h1>

      {/* Dropdown for selecting search type */}
      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
      >
        <option value="name">Search by Name</option>
        <option value="hostel">Search by Hostel</option>
      </select>

      <input
        type="text"
        placeholder={`Search by ${searchType}...`}
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul className="user-list">
        {filteredUsers.map((user) => (
          <li key={user.id}>
            <h2>{user.info[0]?.name || "Unknown User"}</h2>
            <p>Room: {user.info[0]?.room || "N/A"}</p>
            <p>Institute ID: {user.info[0]?.instituteId || "N/A"}</p>
            <p>Hobbies: {user.info[0]?.hobbies || "N/A"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSearchPage;
