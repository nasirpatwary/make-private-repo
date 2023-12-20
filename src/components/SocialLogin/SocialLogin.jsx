import { FcGoogle } from "react-icons/fc";
import useAuth from "../../Hooks/useAuth";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import { useNavigate } from "react-router-dom";
const SocialLogin = () => {
    const { googleSignIn } = useAuth()
    const axiosPublic = UseAxiosPublic()
    const nevigate = useNavigate()
    const handleGoogle = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                }
                axiosPublic.post('/users', userInfo)
                .then(res =>{
                    console.log(res.data)
                    nevigate('/')
                })
            })
    }

    return (
        <div className="p-8">
            <div className="divider"></div>
            <div>
                <button onClick={handleGoogle} className="btn btn-outline btn-secondary rounded-full">
                    <FcGoogle></FcGoogle>
                    Sign up with Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;