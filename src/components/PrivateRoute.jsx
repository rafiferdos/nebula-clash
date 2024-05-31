import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import HashLoader from "react-spinners/HashLoader";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
    const location = useLocation()

    const { user, loading } = useContext(AuthContext)

    if (loading)
        return (
            <div className="lg:min-h-[calc(100vh-450px)] flex items-center justify-center">
                <HashLoader color="#36d7b7" />
            </div>
        )

    if (!user)
        return <Navigate to='/login' state={location?.pathname || '/'} />

    return children
};

export default PrivateRoute;