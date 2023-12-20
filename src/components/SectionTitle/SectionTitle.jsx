
const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="w-4/12 text-center mx-auto my-12">
            <p className="text-yellow-500 mb-2">{subHeading}</p>
            <h2 className="text-3xl uppercase py-4 border-y-4">{heading}</h2>
        </div>
    );
};

export default SectionTitle;

