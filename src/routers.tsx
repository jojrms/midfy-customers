import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/customers",
    element: <Customers />,
  },
]);

const RoutersReturn = () => {
  return <RouterProvider router={router} />;
};

export default RoutersReturn;
