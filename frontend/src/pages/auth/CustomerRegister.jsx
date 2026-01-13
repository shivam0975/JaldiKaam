import React, { useState } from "react";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import isEmail from "validator/lib/isEmail";

export default function CustomerRegister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { name, email, phone, password, confirmPassword } = form;

    if (!name || !email || !phone || !password) {
      return setError("All fields are required.");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    if(!isEmail(email)){
      return setError("Invalid Email Address");
    }

    try {

      await AuthService.registerCustomer(
        name,
        email,
        phone,
        password,
        ["customer"]
      );

      setSuccess("Customer registered successfully!");
      setTimeout(() => {
        navigate("/auth/login");
      } , 1000);



      setForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Registration failed. Please try again."
      );
    }
  };

  return (
    <div style={styles.container}>
      <h2>Customer Registration</h2>

      {error && <div style={styles.error}>{error}</div>}
      {success && <div style={styles.success}>{success}</div>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
}


const styles = {
  container: {
    width: "450px", // Slightly wider for better balance and content
    margin: "60px auto",
    padding: "32px 28px", // More padding for elegance and breathing room
    background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)", // Subtle gradient for a premium feel
    border: "1px solid #e1e5e9",
    borderRadius: "16px", // Softer, modern corners
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1), 0 4px 20px rgba(0, 0, 0, 0.08)", // Layered shadows for depth
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", // Clean, modern font
    transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth hover effect
  },
  containerHover: { // Optional: Add this class for hover in React
    transform: "translateY(-4px)",
    boxShadow: "0 15px 50px rgba(0, 0, 0, 0.15), 0 6px 25px rgba(0, 0, 0, 0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px", // Increased gap for spaciousness
  },
  input: {
    padding: "14px 16px", // More padding for comfort
    fontSize: "16px", // Larger for better readability
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    outline: "none",
    backgroundColor: "#ffffff",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease", // Smooth focus
  },
  inputFocus: { // Optional: Apply on focus
    borderColor: "#007bff",
    boxShadow: "0 0 0 3px rgba(0, 123, 255, 0.1)",
  },
  categoryContainer: {
    marginTop: "20px",
    padding: "16px",
    backgroundColor: "#f9fafb", // Light background to group checkboxes
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
  },
  checkboxLabel: {
    display: "block",
    marginBottom: "12px", // More space between items
    fontSize: "15px",
    color: "#374151", // Darker for readability
    cursor: "pointer",
    transition: "color 0.2s ease",
  },
  checkboxLabelHover: { // Optional: Apply on hover for interactivity
    color: "#007bff",
  },
  button: {
    padding: "14px 20px",
    background: "linear-gradient(135deg, #007bff 0%, #0056b3 100%)", // Gradient for sophistication
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "20px",
    transition: "transform 0.2s ease, box-shadow 0.2s ease", // Hover lift
  },
  buttonHover: { // Optional: Apply on hover
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(0, 123, 255, 0.3)",
  },
  error: {
    color: "#dc2626",
    backgroundColor: "#fee2e2", // Softer red background
    padding: "12px",
    borderRadius: "8px",
    fontSize: "14px",
    marginBottom: "16px",
    border: "1px solid #fca5a5",
  },
  success: {
    color: "#059669",
    backgroundColor: "#d1fae5", // Softer green background
    padding: "12px",
    borderRadius: "8px",
    fontSize: "14px",
    marginBottom: "16px",
    border: "1px solid #a7f3d0",
  },
};
