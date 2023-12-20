import { GiShoppingCart } from "react-icons/gi";
import { NavLink, Outlet } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { FaBook, FaCalendar, FaList, FaUtensils } from "react-icons/fa6";
import { MdLibraryBooks } from "react-icons/md";
import { DiAndroid } from "react-icons/di";
import { IoMenuOutline } from "react-icons/io5";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { IoMdMail } from "react-icons/io";
import UseCart from "../Hooks/UseCart";
import { PiUsersThreeFill } from "react-icons/pi";
import useAdmin from "../Hooks/useAdmin";

const Dashboard = () => {
    const [cart] = UseCart()
    // TODO:get isAdmin  value fom the database
    const [isAdmin] = useAdmin()
    return (
        <div className="flex">
            {/* dashboar side ber */}
            <div className="w-64 min-h-screen bg-sky-300">
                <ul className="menu">
                    {
                        isAdmin ? <>
                            <li><NavLink to="/dashboard/adminHome">
                                <AiOutlineHome />
                                Admin Home</NavLink>
                            </li>
                            <li><NavLink to="/dashboard/addItems">
                                <FaUtensils />
                                Add Items</NavLink>
                            </li>
                            <li><NavLink to="/dashboard/manageItems">
                                <FaList />
                                Manage Items</NavLink>
                            </li>
                            <li><NavLink to="/dashboard/bookings">
                                <FaBook />
                                Manage Bookings</NavLink>
                            </li>
                            <li><NavLink to="/dashboard/users">
                                <PiUsersThreeFill />
                                All Booking</NavLink>
                            </li>
                        </> : <>
                            <li><NavLink to="/dashboard/userHome">
                                <AiOutlineHome />
                                User Home</NavLink>
                            </li>
                            <li><NavLink to="/dashboard/history">
                                <FaCalendar />
                                Payment History</NavLink>
                            </li>
                            <li><NavLink to="/dashboard/cart">
                                <GiShoppingCart></GiShoppingCart>
                                My Cart ({cart.length})</NavLink>
                            </li>
                            <li><NavLink to="/dashboard/review">
                                <MdLibraryBooks />
                                Add Review</NavLink>
                            </li>
                            <li><NavLink to="/dashboard/paymentHistory">
                                <DiAndroid />
                                Payment Real History</NavLink>
                            </li>
                        </>
                    }
                    {/* shared nav links */}
                    <div className="divider text-white">Nasir Hossin</div>
                    <li><NavLink to="/">
                        <AiOutlineHome />
                        Home</NavLink>
                    </li>
                    <li><NavLink to="/order/salad">
                        <IoMenuOutline />
                        Menu</NavLink>
                    </li>
                    <li><NavLink to="/menu">
                        <HiMiniShoppingBag />
                        Shop</NavLink>
                    </li>
                    <li><NavLink to="/secret">
                        <IoMdMail />
                        Contact</NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;