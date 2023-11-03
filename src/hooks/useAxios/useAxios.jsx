import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../providers/AuthContext";
import { useNavigate } from "react-router-dom";


const instance = axios.create({
    baseURL: 'https://ema-zohan-server-cw431fdf8-fardin7864s-projects.vercel.app',
    withCredentials: true,
})

const useAxios = () => {
    const {logOut} = useContext(AuthContext)
    const navigate = useNavigate();

    // Add response interceptors
instance.interceptors.response.use(
    (response) => {
        console.log(response);
        return response;
    },
    (error) => {
        console.log('error from hook:' , error.response.status);
        if (error.response.status === 401 || error.response.status === 403) {
            logOut();
            navigate('/login')
        }

        return Promise.reject(error);
    }
);


    return instance;
};

export default useAxios;