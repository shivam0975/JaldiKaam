// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import Search from "./pages/Search";
import ServiceDetail from "./pages/ServiceDetail";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import CustomerDashboard from "./pages/dashboard/Customer";
import ProviderDashboard from "./pages/dashboard/Provider";
import AdminPanel from "./pages/admin/AdminPanel";
import CustomerRegister from "./pages/auth/CustomerRegister";
import ProviderRegister from "./pages/auth/ProviderRegister"
import ChatWidget from "./components/chat/ChatWidget";
import About from "./pages/About"
import Contact from "./pages/Contact"

export default function App() {
  return (
      <div
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/support" element={<Contact />} />
            <Route path="/search" element={<Search />} />
            <Route path="/service/:id" element={<ServiceDetail />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/dashboard/customer" element={<CustomerDashboard />} />
            <Route path="/dashboard/provider" element={<ProviderDashboard />} />
            <Route path="/dashboard/admin" element={<AdminPanel />} />
            <Route path="/auth/register/customer" element={<CustomerRegister />} />
            <Route path="/auth/register/provider" element={<ProviderRegister />} />


          </Routes>
        </main>
        <Footer />
        <ChatWidget />
      </div>
  );
}
