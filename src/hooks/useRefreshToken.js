import axios from '../api/axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from "react-router-dom"

const useRefreshToken = () => {
    const context = useContext(AuthContext);
    const navigate = useNavigate();

    const refresh = async () => {
        // console.log("refresh: ")
        // console.log("Local Storage - accessToken: " + localStorage.getItem("accessToken"));
        // console.log("Local Storage - refreshToken: " + localStorage.getItem("refreshToken"));

        if(localStorage.getItem("accessToken") === null || localStorage.getItem("accessToken") === null) {
            // console.log("token null")
            // navigate('/login')
            return null
        }

        const response = await axios.get('/auth/token/refresh', {
            withCredentials: false, // sending cookies with request
            headers: { 'Authorization' : `Bearer ${localStorage.getItem("refreshToken")}` }
        }).then((response) => {

            localStorage.setItem("accessToken", response.data.access_token)
            localStorage.setItem("refreshToken", response.data.refresh_token)

            axios.get(`/user/email/${response.data.email}`, {
                headers: { accessToken: localStorage.getItem("accessToken"),
                'Authorization' : `Bearer ${response.data.access_token}` },
            })
            .then((response2) => {
                if(response2?.data != null) {
                    // console.log(response2.data)
                    
                    context?.setAuthState(prev => {
                        return {
                            ...prev,
                            isLogged: true,
                            accessToken: response.data.access_token,
                            refreshToken: response.data.refresh_token,
                            id: response.data.id,
                            email: response.data.email,
                            roles: response2.data.roles
                        }
                    });
                }
            });

            // localStorage.setItem("accessToken", response.data.access_token)
            // localStorage.setItem("refreshToken", response.data.refresh_token)
            return response.data.accessToken;
        }).catch(({ response }) => {
            // console.log(response.data.error_message)
            
            if(response?.data?.error_message.includes("The Token has expired")) {
                // console.log("refreshToken expired... clearing context etc. ----------------")
                context?.setAuthState(
                    {
                        isLogged: false,
                        accessToken: '',
                        refreshToken: '',
                        id: 0,
                        email: '',
                        roles: [{id: 0, name: ''}]
                    }
                );
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                navigate('/login')
            }
            
            // window.location.pathname = "/"
            // return response.data.error_message

        });

        if(!response?.data) {
            // console.log("refresh -> error 403")
        }

        
    }
    return refresh;
};

export default useRefreshToken;
