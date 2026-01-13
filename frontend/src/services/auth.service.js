import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const registerCustomer = (name, email, phone , password, roles) => {
  return axios.post(API_URL + "signup/customer", {
    name,
    email,
    phone,
    password,
    roles
  });
};

const registerProvider = (
  name,
  email,
  phone,
  password,
  location,
  experience,
  price,
  availability,
  service,
  idProof,
  roles
) => {
  const formData = new FormData();

  formData.append("name", name);
  formData.append("email", email);
  formData.append("phone", phone);
  formData.append("password", password);
  formData.append("location", location);
  formData.append("experience", experience);
  formData.append("price", price);
  formData.append("availability", availability);
  formData.append("service", JSON.stringify(service));
  formData.append("idProof", idProof); // 🔥 real file
  formData.append("roles", JSON.stringify(roles));

  return axios.post(API_URL + "signup/provider", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};


const login = async (email, password, role) => {
  try {
    const response = await axios.post(API_URL + "signin", {
      email,
      password,
      role
    });

    if (response.data.email) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};


const logout = async () => {
  localStorage.removeItem("user");
  const response = await axios.post(API_URL + "signout");
  return response.data;
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  registerCustomer,
  registerProvider,
  login,
  logout,
  getCurrentUser,
}

export default AuthService;