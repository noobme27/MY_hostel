import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import Hostel from "../routes/Hostel/Hostel";
//import "./layout.scss";
import Layout from "../routes/Layout/layout";
import HomePage from "../routes/homePage/homePage";
import Hostel from "../routes/Hostel/Hostel";
import Login from "../routes/login/Login";
import Register from "../routes/register/Register";
import Party from "../routes/party/Party";
//import { listPageLoader, singlePageLoader } from "./lib/loaders.js";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/hostel",
          element: <Hostel />,
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
          path: "/party",
          element: <Party />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
