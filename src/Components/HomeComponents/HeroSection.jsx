/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import about from "../../../public/data/about.json";

const HeroSection = ({data}) => {
  return (
    <div className="flex flex-col h-[60vh] lg:h-[80vh] justify-center items-start lg:gap-10 gap-4 py-6 lg:py-14">
      <h2 className="text-white">Hi I am</h2>
      <h2 className="text-success text-2xl lg:text-6xl font-semibold">
        {data.name}
      </h2>
      <h2 className="text-yellow-500 text-xl lg:text-5xl">
        I am a {data.JobTitle}
      </h2>
      <p className="lg:w-2/4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum esse
        dolorem rerum molestiae quaerat sit recusandae perspiciatis
        exercitationem quasi repellendus placeat, voluptates modi ad dolore,
        natus ex cupiditate animi impedit.
      </p>
      <Link to={about.Links.Fiverr}>
        <button className="py-2 px-6 border-success border text-gray-300  hover:bg-success">
          Get Started
        </button>
      </Link>
    </div>
  );
};

export default HeroSection;
