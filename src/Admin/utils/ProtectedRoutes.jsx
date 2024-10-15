import { useEffect, useState } from "react";
import AdminLaout from "../AdminComponent/AdminLaout";
import Login from "../AdminComponent/Login";
import toast from "react-hot-toast";

const ProtectedRoutes = () => {
  const [user, setUser] = useState(null);
  
  // Fetch credentials from environment variables
  const authUserName = import.meta.env.VITE_AUTH_USERNAME;
  const authPassword = import.meta.env.VITE_AUTH_PASSWORD;

  // Check for stored user on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser)); // Parse only if valid JSON
      }
    } catch (error) {
      console.error("Failed to parse stored user data", error);
      localStorage.removeItem("user"); // Clear invalid data
    }
  }, []);

  function handleLogin({ username, password }) {
    if (username === authUserName && password === authPassword) {
      const userData = { username }; // Store user details as an object
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData)); // Save user data as JSON
      toast.success("Successfully Logged In!");
    } else {
      setUser(null);
      localStorage.removeItem("user"); // Remove user details
      toast.error("Wrong Username or Password");
    }
  }

  function handleLogout() {
    setUser(null);
    localStorage.removeItem("user"); // Clear user data on logout
    toast.success("Successfully Logged Out");
  }

  return user ? (
    <AdminLaout user={user} logout={handleLogout} />
  ) : (
    <>
      <Login methode={handleLogin} />
    </>
  );
};

export default ProtectedRoutes;
