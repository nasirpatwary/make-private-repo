import { useEffect, useState } from "react";
import Recommend from "./Recommend";

const Recommends = () => {
    const [recommends, steRrcommends] = useState([])


    useEffect(() => {
        fetch('recommens.json')
            .then(res => res.json())
            .then(data => steRrcommends(data))
    }, [])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {
                recommends.map(recommend => <Recommend
                    key={recommend._id} recommend={recommend} ></Recommend>)
            }
        </div>
    );
};

export default Recommends;