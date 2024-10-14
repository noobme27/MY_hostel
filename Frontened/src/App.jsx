import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../routes/Layout/layout";
import HomePage from "../routes/homePage/homePage";
import Hostel from "../routes/Hostel/Hostel";
import Login from "../routes/login/Login";
import Register from "../routes/register/Register";
import Party from "../routes/party/Party";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "home", // Remove the leading slash when it's a child route
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
  ]);

  return <RouterProvider router={router} />;
}

export default App;
