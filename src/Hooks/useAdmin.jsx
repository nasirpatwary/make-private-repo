import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import UseAxiosSecret from "./UseAxiosSecret";

const useAdmin = () => {
    const { user, loding } = useAuth()
    const axiosSecret = UseAxiosSecret()
    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loding,
        queryFn: async () => {
            console.log('asking or chcking is admin',user);
            const res = await axiosSecret.get(`/users/admin/${user.email}`)
            // console.log(res.data);
            return res.data?.admin
        }
    })
    return [isAdmin, isAdminLoading]
};

export default useAdmin;