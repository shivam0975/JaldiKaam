// import { useNavigate } from "react-router-dom";
// import { useAuthStore } from "../../stores/auth.store";
// export default function Register() {
//   const login = useAuthStore((s) => s.login);
//   const navigate = useNavigate();
//   function submit(e) {
//     e.preventDefault();
//     login("customer");
//     navigate("/");
//   }
//   return (
//     <div className="container" style={{ padding: 24 }}>
//       <h2>Login</h2>
//       <form onSubmit={submit} style={{ marginTop: 12 }}>
//         <input
//           placeholder="Email"
//           style={{
//             width: "100%",
//             padding: 8,
//             border: "1px solid #e5e7eb",
//             marginTop: 8,
//           }}
//         />
//         <input
//           placeholder="Password"
//           style={{ width: "100%", padding: 8, border: "1px solid #e5e7eb" }}
//         />
        
//         <div style={{ marginTop: 12 }}>
//           <button className="btn btn-primary">Login</button>
//         </div>
//       </form>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isEmail } from "validator";
import { useAuth } from "../../AuthContext";


export default function Login() {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [loading , setLoading] = useState(false);
  const [message , setMessage] = useState("");
  const [role , setRole] = useState("customer");


  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email || !password) {
      setMessage("All fields are required.");
      return;
    }

    if (!isEmail(email)) {
      setMessage("Please enter a valid email.");
      return;
    }

    setLoading(true);

    try {
      await login(email, password, role);
      navigate("/");
    } catch (error) {
      const resMessage =
        error?.response?.data?.message ||
        error.message ||
        "Login failed";
      setMessage(resMessage);
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>

      <form onSubmit={handleLogin} style={styles.form}>

        <select value={role} onChange={(e) => setRole(e.target.value)} style={styles.input}>
          <option value="customer">Customer</option>
          <option value="provider">Service Provider</option>
          <option value="admin">Admin</option>
        </select>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button style={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        
        {message && (
          <div className="alert alert-danger" style={{ marginTop: 10 }}>
            {message}
          </div>
        )}

      </form>

      <p style={styles.text}>
        Don’t have an account?{" "}
        <a href="/auth/register" style={styles.link}>Register here</a>
      </p>

      <p style={styles.text}>
        <a href="/forgot-password" style={styles.link}>Forgot Password?</a>
      </p>

    </div>


  );
}

const styles = {
  container: {
    width: "400px", // Slightly wider for better balance
    margin: "80px auto",
    padding: "40px 30px", // More padding for breathing room
    background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)", // Subtle gradient for elegance
    border: "1px solid #e1e5e9",
    borderRadius: "16px", // Softer, more modern corners
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1), 0 4px 20px rgba(0, 0, 0, 0.08)", // Layered shadows for depth
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", // Modern, clean font
    textAlign: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth hover effect
  },
  containerHover: { // Optional: Add this class for hover in React
    transform: "translateY(-4px)",
    boxShadow: "0 15px 50px rgba(0, 0, 0, 0.15), 0 6px 25px rgba(0, 0, 0, 0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px", // Increased gap for elegance
  },
  input: {
    padding: "14px 16px", // More padding for comfort
    fontSize: "16px", // Larger for readability
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
  button: {
    padding: "14px 20px",
    background: "linear-gradient(135deg, #007bff 0%, #0056b3 100%)", // Gradient for sophistication
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease", // Hover lift
  },
  buttonHover: { // Optional: Apply on hover
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(0, 123, 255, 0.3)",
  },
  text: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#6b7280", // Subtle gray
  },
  link: {
    textDecoration: "none",
    color: "#007bff",
    fontWeight: "500",
    transition: "color 0.2s ease",
  },
  linkHover: { // Optional: Apply on hover
    color: "#0056b3",
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

