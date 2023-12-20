import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import MenuImg from "../../../assets/menu/banner3.jpg"
import dessertImg from "../../../assets/menu/dessert-bg.jpeg"
import pizzaImg from "../../../assets/menu/pizza-bg.jpg"
import saladImg from "../../../assets/menu/salad-bg.jpg"
import soupImg from "../../../assets/menu/soup-bg.jpg"
import useMenu from '../../../Hooks/UseMenu';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';
const Menu = () => {
    const [menu] = useMenu()
    const dessert = menu.filter(item=>item.category === 'dessert')
    const pizza = menu.filter(item=>item.category === 'pizza')
    const soup = menu.filter(item=>item.category === 'soup')
    const salad = menu.filter(item=>item.category === 'salad')
    const offered = menu.filter(item=>item.category === 'offered')
    return (
        <div>
            <Helmet>
                <title>Bistro Boss || Menu</title>
            </Helmet>
            <Cover img={MenuImg} title="Our menu" would="Would you like to try a dish?"></Cover>
            {/* main cover */}
            <SectionTitle subHeading="---Don't miss---" heading="TODAY'S OFFER"></SectionTitle>
            {/* offered menu items */}
            <MenuCategory items={offered}></MenuCategory>
            {/* dessert menu items */}
            <MenuCategory items ={dessert} title="dessert" img={dessertImg}></MenuCategory>
            {/* pazza menu items */}
            <MenuCategory items={pizza} title="pizza" img={pizzaImg}></MenuCategory>
            {/* salad menu items */}
            <MenuCategory items={salad} title="salad" img={saladImg}></MenuCategory>
            {/* soup menu items */}
            <MenuCategory items={soup} title="soup" img={soupImg}></MenuCategory>
            
        </div>
    );
};

export default Menu;