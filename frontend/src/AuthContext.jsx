import { createContext, useContext, useState, useEffect } from "react";
import AuthService from "../src/services/auth.service";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(AuthService.getCurrentUser());
  }, []);

  const login = async (email, password, role) => {
    const data = await AuthService.login(email, password, role);
    setUser(data);
    return data;
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    navigate("/auth/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
