import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, RequireAuth } from "../routes/Layout/layout";
//import HomePage from "../routes/homePage/homePage";
import Hostel from "../routes/Hostel/Hostel";
import Login from "../routes/login/Login";
import Register from "../routes/register/Register";
import Party from "../routes/party/Party";
import UpdateProfile from "../routes/UpdateProfile/UpdateProfile";

import ListPage from "../routes/listPage/listPage";
import MakeAdmin from "../routes/makeAdmin/makeAdminPage";

import AdminComplaints from "../routes/adminComplaint/AdminComplaints";
//import ComplaintsPage from "../routes/adminComplaint/AdminComplaints";

import ComplaintPage from "../routes/ComplaintPage/ComplaintPage";
import UserSearchPage from "../routes/UserSearch/UserSearch";
import PartyPage from "../routes/PartyPage/PartyPage";
import Chat from "../routes/chat/chat";

import ProfilePage from "../routes/profilePage/profilePage";
import HomePage2 from "../routes/homePage/homePage2";
import ProfileLayout from "../routes/ProfileLayout/profileLayout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        /* {
          path: "",
          element: <HomePage />,
        }, */
        {
          path: "",
          element: <HomePage2 />,
        },
        {
          path: "hostel",
          element: <Hostel />,
        },
        {
          path: "party",
          element: <Party />,
        },
        {
          path: "list",
          element: <ListPage />,
        },
        {
          path: "/makeAdmin",
          element: <MakeAdmin />,
        },
        {
          path: "/complaint",
          element: <ComplaintPage />,
        },
        {
          path: "/admincomplaint",
          element: <AdminComplaints />,
        },
        {
          path: "/search",
          element: <UserSearchPage />,
        },
        {
          path: "/searchParty",
          element: <PartyPage />,
        },
        {
          path: "/chat",
          element: <Chat />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/profile",
      element: <RequireAuth />, // Protect the profile routes
      children: [
        {
          path: "",
          element: <ProfileLayout />, // Use ProfileLayout as the layout for profile routes
          children: [
            {
              index: true, // Default route for `/profile`
              element: <ProfilePage />,
            },
            {
              path: "/profile/update", // Nested route for `/profile/update`
              element: <UpdateProfile />,
            },
            {
              path: "/profile/complaints", // Nested route for `/profile/complaints`
              element: <ComplaintPage />,
            },
            {
              path: "/profile/searchParty", // Nested route for `/profile/parties`
              element: <PartyPage />,
            },
            {
              path: "/profile/messages", // Nested route for `/profile/messages`
              element: <Chat />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
