export interface AuthInterface {
    isLogged: boolean,
    accessToken: string,
    refreshToken: string,
    id: number,
    email: string,
    roles: [{id:number, name:string}]
}