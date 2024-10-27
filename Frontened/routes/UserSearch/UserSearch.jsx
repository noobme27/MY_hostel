import { useEffect, useState } from "react";
import "./userSearch.scss";

const UserSearchPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchType, setSearchType] = useState("name");
  const [selectedUser, setSelectedUser] = useState(null); // State for the selected user

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8800/api/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
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
      setFilteredUsers(users);
      return;
    }

    const filtered = users.filter((user) => {
      if (user.info && user.info.length > 0) {
        const userInfo = user.info[0];

        const matchCondition =
          searchType === "name"
            ? userInfo.name
              ? userInfo.name.toLowerCase().includes(term)
              : false
            : userInfo.hostel
            ? userInfo.hostel.toLowerCase().includes(term)
            : false;

        return matchCondition;
      }
      return false;
    });

    setFilteredUsers(filtered);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user); // Set the selected user for detail display
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="user-search-page flex">
      <div className="left-side w-1/2 p-4 ">
        <h1 className="text-2xl font-bold">User Search</h1>

        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="select w-full mb-4"
        >
          <option value="name">Search by Name</option>
          <option value="hostel">Search by Hostel</option>
        </select>

        <input
          type="text"
          placeholder={`Search by ${searchType}...`}
          value={searchTerm}
          onChange={handleSearch}
          className="input w-full mb-4"
        />

        <ul className="user-list">
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              className="cursor-pointer hover:bg-gray-200 p-2 rounded"
              onClick={() => handleUserSelect(user)} // Select user on click
            >
              {user.info[0]?.name || "Unknown User"}
            </li>
          ))}
        </ul>
      </div>

      <div className="right-side w-3/4 p-4 border-l">
        {selectedUser ? (
          <div className="user-details">
            <h2 className="text-xl font-semibold">
              {selectedUser.info[0]?.name || "Unknown User"}
            </h2>
            <p>
              <strong>Room:</strong> {selectedUser.info[0]?.room || "N/A"}
            </p>
            <p>
              <strong>Institute ID:</strong>{" "}
              {selectedUser.info[0]?.instituteId || "N/A"}
            </p>
            <p>
              <strong>Hobbies:</strong> {selectedUser.info[0]?.hobbies || "N/A"}
            </p>
            <p>
              <strong>Hostel:</strong> {selectedUser.info[0]?.hostel || "N/A"}
            </p>
            {/* Add more user info as needed */}
          </div>
        ) : (
          <div className="text-center">Select a user to see details</div>
        )}
      </div>
    </div>
  );
};

export default UserSearchPage;
