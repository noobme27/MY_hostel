import { useEffect, useState } from "react";
import {
  FaSearch,
  FaUserAlt,
  FaMapMarkerAlt,
  FaUniversity,
  FaHeart,
} from "react-icons/fa";
import "./userSearch.scss";

const UserSearchPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchType, setSearchType] = useState("name");
  const [selectedUser, setSelectedUser] = useState(null);

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
    setSelectedUser(user);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="user-search-page flex">
      {/* Left Section - Search */}
      <div className="left-side w-full lg:w-1/2 p-4 mb-4 lg:mb-0">
        <h1 className="text-2xl font-bold text-center mb-4">User Search</h1>

        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="select w-full mb-4 p-2 border rounded-lg"
        >
          <option value="name">Search by Name</option>
          <option value="hostel">Search by Hostel</option>
        </select>

        <div className="search-input-wrapper relative mb-4">
          <input
            type="text"
            placeholder={`Search by ${searchType}...`}
            value={searchTerm}
            onChange={handleSearch}
            className="input w-full p-3 pl-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <ul className="user-list max-h-96 overflow-y-auto">
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              className={`cursor-pointer hover:bg-gray-200 p-4 rounded-lg transition-all duration-300 ${
                selectedUser?.id === user.id ? "bg-blue-100" : ""
              }`}
              onClick={() => handleUserSelect(user)}
            >
              <div className="user-card">
                <FaUserAlt className="user-icon text-2xl text-blue-500" />
                <div>{user.info[0]?.name || "Unknown User"}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Section - User Details */}
      <div className="right-side w-full lg:w-1/2 p-4 border-l mt-4 lg:mt-0">
        {selectedUser ? (
          <div className="user-details bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">
              {selectedUser.info[0]?.name || "Unknown User"}
            </h2>
            <div className="user-info">
              <p>
                <FaMapMarkerAlt className="inline mr-2" />
                <strong>Room:</strong> {selectedUser.info[0]?.room || "N/A"}
              </p>
              <p>
                <FaUniversity className="inline mr-2" />
                <strong>Institute ID:</strong>{" "}
                {selectedUser.info[0]?.instituteId || "N/A"}
              </p>
              <p>
                <FaHeart className="inline mr-2" />
                <strong>Hobbies:</strong>{" "}
                {selectedUser.info[0]?.hobbies || "N/A"}
              </p>
              <p>
                <FaMapMarkerAlt className="inline mr-2" />
                <strong>Hostel:</strong> {selectedUser.info[0]?.hostel || "N/A"}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center text-lg">
            Select a user to see details
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSearchPage;
