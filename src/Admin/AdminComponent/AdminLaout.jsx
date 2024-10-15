/* eslint-disable react/prop-types */
import { Outlet, useNavigate } from "react-router-dom";
import AdminNav from "./AdminNav";
import AdminFooter from "./AdminFooter";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

const AdminLayout = ({ logout }) => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    logout(null);
    navigate("/");
  };

  const toggleThemeButton = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${darkMode ? "dark" : ""} dark:bg-gray-900 bg-white`}>
      <div className="pt-16 bg-white dark:bg-gray-900">
        <Toaster position="top-center" reverseOrder={false} />
        <AdminNav
          logout1={handleLogout}
          data={toggleThemeButton}
          mode={darkMode}
        />
        <Outlet />
        <AdminFooter />
      </div>
    </div>
  );
};

export default AdminLayout;
