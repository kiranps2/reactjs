import { createBrowserRouter } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login />
  }
]);

export default router;