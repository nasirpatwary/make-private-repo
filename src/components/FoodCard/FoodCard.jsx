import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import UseAxiosSecret from "../../Hooks/UseAxiosSecret";
import UseCart from "../../Hooks/UseCart";

const FoodCard = ({ item }) => {
    const { name, image, price, recipe, _id} = item
    const {user} = useAuth()
    const nevigate = useNavigate()
    const location = useLocation()
    const axiosSecret = UseAxiosSecret()
    const [,refetch] = UseCart()

    const handleToCard = () => {
        if (user  &&  user.email) {
            // send cart item to the database
            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price
            }
            axiosSecret.post('/carts',cartItem)
            .then(res =>{
                console.log(res.data);
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${name} added to your cart`,
                        showConfirmButton: false,
                        timer: 1500
                      });
                    //  refetch cart to update the cart items cuont
                    refetch()
                }
            })
    }
    else{
        Swal.fire({
            text: "You are not logged In!",
            title: "Please login add to the cart?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, login!"
          }).then((result) => {
            if (result.isConfirmed) {
            //   send the user to the login page
            nevigate('/login',{state:{from:location}})
            }
          });
    }
}
    return (
        <div className="card bg-slate-100">
            <figure><img className="w-full" src={image} alt="Shoes" /></figure>
            <p className="absolute right-0 mr-4 mt-4 px-3 bg-slate-900 text-white">${price}</p>
            <div className="card-body flex flex-col items-center">
                <h2 className="card-title ">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button onClick={handleToCard}
                        className="btn btn-outline text-[#BB8506] bg-slate-100 border-0 border-b-4 border-b-[BB8506] mt-4">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;