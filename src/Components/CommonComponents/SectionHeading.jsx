/* eslint-disable react/prop-types */

const SectionHeading = ({title}) => {
    return (
        <div className="flex items-center gap-8 py-10">
            <h2 className="lg:text-3xl text-xl">{title}</h2>
            <div className="lg:w-60 w-40 h-[1px] bg-success"></div>
        </div>
    );
};

export default SectionHeading;