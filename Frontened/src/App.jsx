import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, RequireAuth } from "../routes/Layout/layout";
import HomePage from "../routes/homePage/homePage";
import Hostel from "../routes/Hostel/Hostel";
import Login from "../routes/login/Login";
import Register from "../routes/register/Register";
import Party from "../routes/party/Party";
import UpdateProfile from "../routes/UpdateProfile/UpdateProfile";

import ListPage from "../routes/listPage/listPage";
import MakeAdmin from "../routes/makeAdmin/makeAdminPage";

import AdminComplaints from "../routes/adminComplaint/AdminComplaints";
import ComplaintsPage from "../routes/adminComplaint/AdminComplaints";
import Complaint from "../routes/Complaint/Complaint";
import ComplaintPage from "../routes/ComplaintPage/ComplaintPage";
import UserSearchPage from "../routes/UserSearch/UserSearch";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <HomePage />,
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
          element: <ComplaintsPage />,
        },
        {
          path: "/search",
          element: <UserSearchPage />,
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
      path: "/",
      element: <RequireAuth />,
      children: [
        /* {
          path: "/profile",
          element: <ProfilePage />,
          loader: profilePageLoader,
        }, */
        {
          path: "update",
          element: <UpdateProfile />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
