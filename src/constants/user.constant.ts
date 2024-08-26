export interface User {
    id: string,
    name: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    logoUrl: string,
}

export type UserUpdate = Partial<User>

//[ ] INTERFAZ PARCIAL PARA EL LOGIN
export type LoginUser = Pick<User, 'username' | 'password'>