import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAdmin from "../Hooks/useAdmin";

const AddminRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const [isAdmin, isAdminLoading] = useAdmin()
    const location = useLocation()
    if (loading || isAdmin) {
        return <progress className="progress w-56"></progress>
    }
    if (user && isAdminLoading) {
        return children
    }
    return <Navigate to="/" state={{ form: location }} replace ></Navigate>
};

export default AddminRoute;