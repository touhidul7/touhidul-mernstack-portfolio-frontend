import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
    return (
        <div className="pt-14 dark:bg-gray-900">
            Dashboard
            
            <Link to={"/info"}><Button className="text-black dark:text-white dark:bg-gray-900">Personal Information</Button></Link>
        </div>
    );
};

export default AdminDashboard;