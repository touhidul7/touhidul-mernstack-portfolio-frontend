/* eslint-disable react/prop-types */
import { useState } from "react";

const ExperienceTab = ({ data }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const experiences = data?.experience || [];

  return (
    <div className="flex gap-20 py-10">
      <div className="border-l-[1px] border-white flex flex-col gap-6 ">
        {experiences.map((experienceItem, index) => (
          <div
            onClick={() => {
              setSelectedTab(index);
            }}
            key={index}
            className={`hover:border-l-[3px] w-40 py-2 pr-2 cursor-pointer border-success pl-6 ml-[-2px]
                 ${
                   selectedTab === index
                     ? "border-l-[3px] border-success bg-[#003b2696]"
                     : "border-none"
                 }`}
          >
            {experienceItem.range}
          </div>
        ))}
      </div>

      {experiences[selectedTab] && (
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-success">
            {experiences[selectedTab].jobTitle}
          </h2>
          <h2 className="text-lg font-semibold">
            {experiences[selectedTab].companyName}
          </h2>
          <p>{experiences[selectedTab].description}</p>
        </div>
      )}
    </div>
  );
};

export default ExperienceTab;
