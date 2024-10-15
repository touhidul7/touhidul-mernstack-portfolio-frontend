/* eslint-disable react/prop-types */
import SectionHeading from '../CommonComponents/SectionHeading';
import ExperienceTab from '../CommonComponents/ExperienceTab';

const Experiences = ({data}) => {
  return (
    <div className="py-10">
      <SectionHeading title={"Experience"} />
      <ExperienceTab data={data}/>
      
    
    </div>
  );
};

export default Experiences;