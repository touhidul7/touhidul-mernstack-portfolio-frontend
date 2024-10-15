/* eslint-disable react/prop-types */
import { CircleUserRoundIcon, Moon, SunMoon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const AdminNav = (props) => {
  const location = useLocation();

  return (
    <div className="flex justify-between items-center fixed top-0 dark:bg-gray-900 w-full border-b-[1px] dark:border-gray-700 border-gray-200">
      <div className="text-sm font-medium text-center text-black dark:text-gray-100 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px z-[999]">
          {["admin", "infoupdate", "projectsupdate", "experienceupdate",].map((item) => (
            <li className="me-2" key={item}>
              <Link
                to={`/${item}`}
                className={`inline-block p-4 border-b-2 rounded-t-lg cursor-pointer ${
                  location.pathname === `/admin/${item}`
                    ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                    : "border-transparent dark:text-gray-100 text-black hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center">
        <button
          onClick={props.data}
          className="w-fit rounded-full dark:bg-[#191E24] dark:text-[#A6ADBB] p-2"
          aria-label="Toggle Dark Mode"
        >
          {props.mode ? <Moon /> : <SunMoon />}
        </button>

        <div className="dropdown dropdown-bottom dropdown-end w-fit rounded-full bg-transparent dark:text-[#A6ADBB]">
          <div
            tabIndex={0}
            role="button"
            className="p-2 hover:bg-slate-300 dark:hover:bg-gray-700 rounded-full m-1 bg-transparent"
            aria-label="User Menu"
          >
            <CircleUserRoundIcon />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu hover:bg-slate-300 dark:hover:bg-gray-700 bg-white dark:bg-gray-900 dark:border-[1px] dark:border-gray-950 rounded z-[1] shadow p-0"
          >
            <li>
              <button
                className="w-fit bg-white hover:bg-slate-300 dark:hover:bg-gray-700 dark:bg-gray-900 dark:text-[#A6ADBB] p-2"
                onClick={props.logout1}
                aria-label="Logout"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
