import { useState } from "react";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";


// Categories (unchanged)
// eslint-disable-next-line react-refresh/only-export-components
export const categories = [
  {
    group: "Home Services",
    items: [
      { name: "Plumbing", slug: "plumbing" },
      { name: "Electrician", slug: "electrician" },
      { name: "Cleaning", slug: "cleaning" },
      { name: "Carpentry", slug: "carpentry" }
    ]
  },
  {
    group: "Personal Services",
    items: [
      { name: "Beauty", slug: "beauty" },
      { name: "Fitness Trainer", slug: "fitness" },
      { name: "Tutor", slug: "tutor" }
    ]
  },
  {
    group: "Professional Services",
    items: [
      { name: "Accountant", slug: "accountant" },
      { name: "Lawyer", slug: "lawyer" },
      { name: "Designer", slug: "designer" }
    ]
  }
];

export default function ProviderRegister() {

  const navigate = useNavigate();
  

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    services: [],
    experience: "",
    location: "",
    price: "",
    availability: "",
    idProof: null
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const toggleService = (slug) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(slug)
        ? prev.services.filter((s) => s !== slug)
        : [...prev.services, slug]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (
      !form.fullName ||
      !form.email ||
      !form.phone ||
      !form.password ||
      !form.location ||
      !form.experience ||
      !form.price
    ) {
      return setError("All fields are required!");
    }

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match!");
    }

    if (form.services.length === 0) {
      return setError("Select at least one service.");
    }

    if (!form.idProof) {
      return setError("Upload an ID proof document.");
    }

    try {
      setLoading(true);

      await AuthService.registerProvider(
        form.fullName,
        form.email,
        form.phone,
        form.password,
        form.location,
        form.experience,
        form.price,
        form.availability,
        form.services,
        form.idProof,
        ["provider"]
      );

      setSuccess("Provider Registration Successful! Pending verification.");

      setTimeout(() => {
        navigate("/auth/login");
      } , 1000);

      setForm({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        services: [],
        experience: "",
        location: "",
        price: "",
        availability: "",
        idProof: null
      });


    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Register as a Service Provider</h2>

      {error && <div style={styles.error}>{error}</div>}
      {success && <div style={styles.success}>{success}</div>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} style={styles.input} />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} style={styles.input} />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} style={styles.input} />

        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} style={styles.input} />
        <input name="confirmPassword" type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} style={styles.input} />

        <input name="location" placeholder="Service Location" value={form.location} onChange={handleChange} style={styles.input} />
        <input name="experience" placeholder="Years of Experience" value={form.experience} onChange={handleChange} style={styles.input} />
        <input name="price" placeholder="Price Per Hour" value={form.price} onChange={handleChange} style={styles.input} />
        <input name="availability" placeholder="Availability" value={form.availability} onChange={handleChange} style={styles.input} />

        <div style={styles.categoryContainer}>
          <h3>Select Services You Offer</h3>
          {categories.map((group) => (
            <div key={group.group}>
              <h4>{group.group}</h4>
              {group.items.map((item) => (
                <label key={item.slug} style={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={form.services.includes(item.slug)}
                    onChange={() => toggleService(item.slug)}
                  />
                  {item.name}
                </label>
              ))}
            </div>
          ))}
        </div>

        <label>ID Proof Upload:</label>
        <input type="file" name="idProof" onChange={handleChange} />

        <button style={styles.button} disabled={loading}>
          {loading ? "Registering..." : "Register as Provider"}
        </button>
      </form>
    </div>
  );
}

// styles unchanged


const styles = {
  container: {
    width: "480px", // Slightly wider for better balance and content
    margin: "50px auto",
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
    borderColor: "#28a745", // Matches button color for consistency
    boxShadow: "0 0 0 3px rgba(40, 167, 69, 0.1)",
  },
  categoryContainer: {
    marginTop: "20px",
    padding: "16px",
    backgroundColor: "#f9fafb", // Light background to group checkboxes
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
  },
  checkbox: {
    display: "block",
    marginBottom: "12px", // More space between items
    fontSize: "15px",
    color: "#374151", // Darker for readability
    cursor: "pointer",
    transition: "color 0.2s ease",
  },
  checkboxHover: { // Optional: Apply on hover for interactivity
    color: "#28a745", // Matches button color
  },
  button: {
    padding: "14px 20px",
    background: "linear-gradient(135deg, #28a745 0%, #1e7e34 100%)", // Gradient for sophistication, using green theme
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
    boxShadow: "0 6px 20px rgba(40, 167, 69, 0.3)",
  },
  error: {
    backgroundColor: "#fee2e2", // Softer red background
    color: "#dc2626",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "14px",
    marginBottom: "16px",
    border: "1px solid #fca5a5",
  },
  success: {
    backgroundColor: "#d1fae5", // Softer green background
    color: "#059669",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "14px",
    marginBottom: "16px",
    border: "1px solid #a7f3d0",
  },
};
