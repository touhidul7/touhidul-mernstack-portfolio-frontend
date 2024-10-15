/* eslint-disable react/prop-types */
import SectionHeading from "../CommonComponents/SectionHeading";
// import about from "../../../public/data/about.json";

const About = ({data}) => {
  console.log(data.Skills)
  return (
    <div id="about">
      <SectionHeading title="About Me" />

      {/* Description Section---------- */}
      <div className="flex gap-4 lg:gap-20 items-center lg:flex-row flex-col">
        <div className="lg:h-[70vh] h-[40vh]">
          <dotlottie-player
            src="https://lottie.host/ffc4c1dd-a6a9-4c78-9a1f-6f5616560875/3BSIZ9Mwpx.json"
            background="transparent"
            speed="1"
            autoplay
          ></dotlottie-player>
        </div>
        <div className="lg:w-3/4 flex flex-col gap-10">
          <p className="text-justify">
          {/* {data[0].Description} */}
          {data.Description}
          </p>
        </div>
      </div>

      {/* Skills Section----------------- */}
      <div className="py-10 flex flex-col gap-10">
        <div>
          <h2 className="text-success text-xl">
            Here are the technologies I have experienced in
          </h2>
        </div>
        <div className="flex items-center gap-5 flex-wrap">
          {data?.Skills?.map((skill, index) => (
            <button
              key={index}
              className="py-2 px-6 border-success border text-gray-300  hover:bg-success"
            >
              {skill}
            </button>
          ))} 
        </div>
      </div>
    </div>
  );
};

export default About;
