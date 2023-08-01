import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Room from "./components/user/Room/Room";
import ProtectedRoute from "./components/user/ProtectedRoute";
import PublicRoute from "./components/user/PublicRoute";
import Profile from "./components/user/Profile";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import Home from "./components/user/Home.jsx";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import Code from "./components/user/Code/Code";
import UsersList from "./components/user/UserList/UsersList";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  const currentValue = useSelector((state) => state.profileSwitch.visible);
  const codeSection = useSelector((state) => state.codeSwitch.visible);
  const usersListSection = useSelector((state) => state.usersListSwitch.visible)

  return (
    <>
      {loading && (
        <div className="spinner-parent">
          <div className="spinner-border" role="status"></div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              {currentValue && <Profile />}
              <Home />
            </ProtectedRoute>
          }
        />
        {/* Login */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        {/* Register */}
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        {/* Room */}
        <Route
          path="/room/:roomID"
          element={
            <ProtectedRoute>
              {codeSection && <Code />}
              {usersListSection && <UsersList/>}
              <Room />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
