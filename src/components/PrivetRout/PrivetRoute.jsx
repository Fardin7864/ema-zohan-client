import { useContext } from "react";
import { AuthContext } from "../../providers/AuthContext";
import { Navigate } from "react-router-dom";


const PrivetRoute = ({children}) => {
    const {userC,isLoading} = useContext(AuthContext);
    if(isLoading){
        return <div className=" mt-10"><h4 className=" text-3xl font-bold">Loading ...</h4></div>
    }
    if (userC) {
        return children;
    }

    return (
        <Navigate to="/login/login" />
    );
};

export default PrivetRoute;