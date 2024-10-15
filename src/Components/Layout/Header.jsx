/* eslint-disable react/prop-types */

import { Moon, SunMoon } from "lucide-react";
import { Link } from "react-router-dom";
const Header = (props) => {
  return (
    <div>
      <div className="navbar  shadow bg-[#F3F4F6] dark:bg-[#1D232A] dark:text-[#A6ADBB]">
        <div className="navbar-start">
          {/* Mobile Menu---------------------------*/}

          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/about"}>About</Link>
              </li>
              <li>
                <a>Skill</a>
              </li>

              <li>
                <a>Projects</a>
                <ul className="p-2">
                  <li>
                    <a>HTML</a>
                  </li>
                  <li>
                    <a>REACT</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        {/* Large Menue----------------------- */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/about"}>About</Link>
            </li>
            <li>
              <Link to={"/skill"}>Skill</Link>
            </li>
            <li>
              <Link to={"/contact"}>Contact</Link>
            </li>
            <li>
              <Link to={"/contact"}>Projects</Link>
            </li>
         
          </ul>
        </div>

        <div className="navbar-end">
          <button
            onClick={props.data}
            className=" w-fit rounded-full dark:bg-[#191E24] dark:text-[#A6ADBB]"
          >
            {props.mode ? <Moon /> : <SunMoon />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
