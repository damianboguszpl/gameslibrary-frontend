import { Outlet } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import useRefreshToken from './hooks/useRefreshToken';

import { AuthContext } from './context/AuthContext';

import { CircularProgress } from "@mui/material";


const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const context = useContext(AuthContext);
    const authState = context.authState;

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }
        // console.log("---aT: "+authState.accessToken)

        !authState?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
    }, [])

    // useEffect(() => {
    //     console.log(`isLoading: ${isLoading}`)
    //     console.log(`aT: ${JSON.stringify(authState?.accessToken)}`)
    // }, [isLoading])

    if (isLoading) return <CircularProgress sx={{ margin: '0 auto', color: '#DCC080' }} size={200} />
    else return <Outlet />
}

export default PersistLogin