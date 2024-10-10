import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import Hostel from "../routes/Hostel/Hostel";
//import "./layout.scss";
import Layout from "../routes/Layout/layout";
import HomePage from "../routes/homePage/homePage";
import Hostel from "../routes/Hostel/Hostel";
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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
