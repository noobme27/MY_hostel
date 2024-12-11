import { NavLink, Outlet } from "react-router-dom";
import "./ProfileLayout.scss";

function ProfileLayout() {
  return (
    <div className="profile-layout">
      {/* Sidebar */}
      <div className="profile-layout-sidebar">
        <nav className="profile-layout-nav">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive
                ? "profile-layout-nav-link active"
                : "profile-layout-nav-link"
            }
            end
          >
            Profile
          </NavLink>
          <NavLink
            to="/profile/update"
            className={({ isActive }) =>
              isActive
                ? "profile-layout-nav-link active"
                : "profile-layout-nav-link"
            }
          >
            Update Profile
          </NavLink>
          <NavLink
            to="/profile/complaints"
            className={({ isActive }) =>
              isActive
                ? "profile-layout-nav-link active"
                : "profile-layout-nav-link"
            }
          >
            Your Complaints
          </NavLink>
          <NavLink
            to="/profile/searchParty"
            className={({ isActive }) =>
              isActive
                ? "profile-layout-nav-link active"
                : "profile-layout-nav-link"
            }
          >
            Your Parties
          </NavLink>
          {/* <NavLink
            to="/profile/messages"
            className={({ isActive }) =>
              isActive
                ? "profile-layout-nav-link active"
                : "profile-layout-nav-link"
            }
          >
            Messages Received
          </NavLink> */}
        </nav>
      </div>

      {/* Content */}
      <div className="profile-layout-content">
        <Outlet />
      </div>
    </div>
  );
}

export default ProfileLayout;
