import { useState } from "react";

import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isLogged: false,
        accessToken: '',
        refreshToken: '',
        id: 0,
        email: '',
        roles: [{id: '', name: ''}]
    });

    return (
        <AuthContext.Provider value={{ authState, setAuthState }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;