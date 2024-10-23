import { useEffect, useState } from "react";
import "./userSearch.scss";

const UserSearchPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

    const filtered = users.filter((user) => {
      if (user.info && user.info.length > 0) {
        const userInfo = user.info[0]; // Get the first info object
        const nameMatch = userInfo.name
          ? userInfo.name.toLowerCase().includes(term)
          : false;
        const hostelMatch = userInfo.hostel
          ? userInfo.hostel.toLowerCase().includes(term)
          : false;
        return nameMatch || hostelMatch; // Match by either name or hostel
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
      <input
        type="text"
        placeholder="Search by name or hostel..."
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
