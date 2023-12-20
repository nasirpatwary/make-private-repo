import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContex } from "../../../Providers/AuthProvider";
import { GiShoppingCart } from "react-icons/gi";
import UseCart from "../../../Hooks/UseCart";
import { Blocks, Dna, Vortex } from "react-loader-spinner";
import useAdmin from "../../../Hooks/useAdmin";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContex)
    const [isAdmin] = useAdmin()
    const [cart] = UseCart()
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))
    }
    const navOptions = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Our Menu</Link></li>
        <li><Link to="/order/salad">Order Food</Link></li>
        {
            // user ? 'true' : 'false'
            //  user ? condition ? 'double true' : 'one true' : 'false'
        }
        {
            user && isAdmin && <li><Link to="/dashboard/adimnHome">Dashboard</Link></li>
        }
        {
            user && !isAdmin && <li><Link to="/dashboard/userHome">Dashboard</Link></li>
        }
        <li><Link to="/dashboard/cart">
            <button className="btn -mt-3">
                <GiShoppingCart className="text-xl text-white"></GiShoppingCart>
                <div className="badge text-white bg-sky-300">+{cart.length}</div>
            </button>

        </Link></li>
        {
            user ? <>
                {/* <span>{user?.displayName}</span> */}
                <li><button onClick={handleLogOut}>LOGOUT</button></li>
            </> : <>
                <li><Link to="/login">Login</Link></li>
            </>
        }

    </>
    return (
        <div className="navbar text-white fixed z-10 bg-opacity-30 bg-black max-w-6xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-sky-300 rounded-box w-52">
                        {navOptions}
                    </ul>
                </div>
                <div className="flex text-white">
                    <Vortex
                        visible={true}
                        height="52"
                        width="52"
                        ariaLabel="vortex-loading"
                        wrapperStyle={{}}
                        wrapperClass="vortex-wrapper"
                        colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
                    />
                    <h2 className="text-3xl font-bold leading-normal">BISTRO BOSS</h2>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navOptions}
                </ul>
            </div>
            <div className="navbar-end">
                <Blocks
                    visible={true}
                    height="64"
                    width="64"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                />
                <Dna
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper"
                />
                <a className="btn btn-sky border-0 border-b-2 text-[#BB8506] ">Bistro</a>
            </div>
        </div>
    );
};

export default Navbar;