export interface UserDto{
    numberIdentification: number
    firstName: string,
    lastName: string,
    email: string,
    password: string
    role:'user'|'admin'|'generic'
}