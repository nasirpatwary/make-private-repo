import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import ChefService from "../ChefService/ChefService";
import Featured from "../Featured/Featured";
import Popularmenu from "../Popularmenu/Popularmenu";
import Recommends from "../Recommends/Recommends";
import TestiMonials from "../TestiMonials/TestiMonials";
import Diff from "../Diff/Diff";
import Phone from "../Phone/Phone";
import Button from "../Button/Button";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro Home</title>
            </Helmet>
            <Banner></Banner>
            <Button></Button>
            <Category></Category>
            <ChefService></ChefService>
            <Popularmenu></Popularmenu>
            <Phone></Phone>
            <Recommends></Recommends>
            <Featured></Featured>
            <TestiMonials></TestiMonials>
            <Diff></Diff>
        </div>
    );
};

export default Home;