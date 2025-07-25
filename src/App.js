// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import ToDoList from "./components/ToDoList";
import PrivateRoute from "./components/PrivateRoute";
import Sidebar from "./components/navbar";

function PrivateLayout({ children }) {
  return (
    <div className="app-layout">
      <Sidebar />
      <main style={{ marginLeft: '220px', padding: '20px' }}>
        {children}
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes (no sidebar) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private routes (with sidebar) */}
        <Route
          path="/todos"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <ToDoList />
              </PrivateLayout>
            </PrivateRoute>
          }
        />

        {/* Redirect all unknown routes to login */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
