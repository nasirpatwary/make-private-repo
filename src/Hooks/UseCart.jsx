// api, axios (axios secure), tan stack
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecret from "./UseAxiosSecret";
import useAuth from "./useAuth";
const UseCart = () => {
    const axiosSecret = UseAxiosSecret()
    const {user} = useAuth()
    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['cart',user?.email],
        queryFn: async () => {
            const res = await axiosSecret.get(`/carts?email=${user.email}`)
            return res.data
        }

    })
    return [cart, refetch]
};

export default UseCart;