export interface AuthInterface {
    isLogged: boolean,
    accessToken: string,
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    roleId: number
}