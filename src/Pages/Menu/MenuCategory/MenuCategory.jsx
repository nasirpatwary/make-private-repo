import MenuItem from "../../Shared/MenuItem/MenuItem";
import Cover from "../../Shared/Cover/Cover";
import { Link } from "react-router-dom";

const MenuCategory = ({ items, title, img }) => {
    return (
        <div className="pt-8">
            {title && <Cover img={img} title={title}></Cover>}
            <div className="grid md:grid-cols-2 gap-10 mt-10">
                {
                    items.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
            <Link to={`/order/${title}`}>
                <button className="btn btn-outline text-[#BB8506] border-0 border-b-4 border-b-[BB8506] mt-4">Order Now</button>
            </Link>
        </div>
    );
};

export default MenuCategory;