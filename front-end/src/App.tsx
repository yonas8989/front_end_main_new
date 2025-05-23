import React from 'react';
import { BrowserRouter as Router, Routes, Route,Outlet } from 'react-router-dom';
import AppLayout from './components/Layout/AppLayout';
import AuthLayout from './components/Layout/AuthLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes - wrapped with AuthLayout */}
        <Route element={<AuthLayout><Outlet /></AuthLayout>}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Protected routes - wrapped with AppLayout */}
        <Route element={<AppLayout><Outlet /></AppLayout>}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;