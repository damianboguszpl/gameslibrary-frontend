import { createContext, Dispatch, SetStateAction } from "react";
import { AuthInterface } from "../interfaces/AuthInterface";

interface AuthContextInterface {
    authState: AuthInterface,
    setAuthState: Dispatch<SetStateAction<AuthInterface>>
}

export const AuthContext = createContext(<AuthContextInterface | null>(null));