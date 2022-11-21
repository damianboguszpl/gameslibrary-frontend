import { useState } from "react";

import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isLogged: false,
        accessToken: '',
        id: 0,
        firstname: '',
        lastname: '',
        email: '',
        roleId: 0
    });

    return (
        <AuthContext.Provider value={{ authState, setAuthState }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;