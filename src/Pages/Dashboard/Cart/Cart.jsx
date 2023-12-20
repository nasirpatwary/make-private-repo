import UseCart from "../../../Hooks/UseCart";
import Swal from "sweetalert2";
import UseAxiosSecret from "../../../Hooks/UseAxiosSecret";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Cart = () => {
    const [cart, refetch] = UseCart()
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)
    const axiosSecret = UseAxiosSecret()
    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecret.delete(`/carts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div>
            <div className="flex justify-evenly mb-8">
                <h2 className="text-4xl">Items:{cart.length}</h2>
                <h2 className="text-4xl">Total Price:{totalPrice}</h2>
                {cart.length ? <Link to='/dashboard/payment'>
                    <button className="btn bg-[#D1A054] text-white">Pay</button>
                </Link> :
                    <button disabled className="btn bg-[#D1A054] text-white">Pay</button>
                }
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>

                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item, i) => <tr key={item._id}>
                                <th>
                                    {i + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {item.name}
                                </td>
                                <td>{item.price}</td>
                                <th>
                                    <button onClick={() => handleDelete(item._id)} className="btn btn-ghost btn-lg">
                                        <RiDeleteBinLine className="text-2xl text-red-500" />
                                    </button>
                                </th>
                            </tr>
                            )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Cart;