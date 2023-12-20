
const Recommend = ({ recommend }) => {
    const { name, image, recipe, category } = recommend
    return (
        <div className="border bg-gray-100 mx-auto my-12">
            <img className="w-[400px] h-[300px]" src={image} alt="Shoes" />
            <div className="text-center card bg-gray-100 ">
                <h2>{name}</h2>
                <p className="line-height-[26px] px-8">{recipe} </p>
                <div className="py-4">
                    <button className="btn btn-outline border-0 border-b-4 text-[#BB8506] border bg-[#E8E8E8]">{category}</button>
                </div>
            </div>

        </div>
    );
};

export default Recommend;