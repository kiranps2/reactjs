
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import {
  Dashboard,
  EditPage,
  ComparePage,
} from "./App";

function PrivateRoute({ children }) {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );

  return currentUser ? children : <Navigate to="/login" replace />;
}

function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/edit/:id"
        element={
          <PrivateRoute>
            <EditPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/compare"
        element={
          <PrivateRoute>
            <ComparePage />
          </PrivateRoute>
        }
      />

      <Route
        path="/"
        element={<Navigate to="/dashboard" replace />}
      />

      <Route
        path="*"
        element={<Navigate to="/dashboard" replace />}
      />
    </Routes>
  );
}

export default AppRouter;
