import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
// import Login from "../pages/Login/Login";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />,
        errorElement: <Dashboard />,
    },
    // {
    //     path: "/",
    //     element: <Login />,
    // }
]);