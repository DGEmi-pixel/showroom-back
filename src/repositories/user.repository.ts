import { userModel } from "../db/models/user.model"
import { LoginUser, User } from "../constants/user.constant"
import { comparePassword } from "../utils/password.utils"
import { ApiError } from "../constants/error.constant"


const getAllUsers = async (): Promise<User[]> => {
    try {
        const users = await userModel.find()
        return users
    } catch (error) {
        throw error
    }
}

const getUserByUsername = async ( username: string): Promise<User | ApiError> => {
    try {
        const user = await userModel.findOne({username}).select('-password')
        if(user) {
            return user
        } else {
            return({
                error: true,
                message: `Error, no se ha encontrado ningún usuario con el username ${username}`,
                statusCode: 500,
                details: user
            })
        }
    } catch (error) {
        throw error
    }
}

const createUser = async (userData: User): Promise<User | ApiError> => {
    try {
        const user = await new userModel(userData).save()
        if(user){
            return user
        } else {
            return({
                error: true,
                message: 'Error, imposible guardar el usuario',
                statusCode: 500,
                details: user
            })
        }
    } catch (error) {
        throw error
    }
}

const updateUser = async (userData: User, userId: string): Promise<User | ApiError> => {
    try {
        const user = await userModel.findByIdAndUpdate(userId, userData, {new: true, select: '-password'})
        if(user){
            return({
                error: false,
                message: 'Usuario actualizado',
                statusCode: 200,
                data: user
            })
        } else {
            return({
                error: true,
                message: 'Error, imposible actualizar el usuario',
                statusCode: 500,
                details: user
            })
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

const authentication = async (loginData: LoginUser): Promise<User | ApiError> => {
    try {
        //[ ] Primero se verifica la existencia del usuario
        const user = await userModel.findOne({username: loginData.username})

        if(user){
            const considence = await comparePassword(loginData.password, user.password)
            if(considence) {
                return user
            } else {
                //Contraseña no válida
                return ({
                    error: true,
                    message: 'Credenciales no válidas',
                    statusCode: 404
                })
            }
        } else {
            return ({
                error: true,
                message: 'Credenciales no válidas',
                statusCode: 404
            })
        }
    } catch (error) {
        throw error
    }
}

export const userRepository = {
    getAllUsers,
    getUserByUsername,
    createUser,
    updateUser,
    authentication
}