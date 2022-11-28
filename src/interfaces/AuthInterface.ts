export interface AuthInterface {
    isLogged: boolean,
    accessToken: string,
    refreshToken: string,
    id: number,
    email: string,
    login: string,
    roles: [{id:number, name:string}]
}