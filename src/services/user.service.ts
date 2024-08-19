import {userRepository} from '../repositories/user.repository'
import { LoginUser, User } from "../constants/user.constant"
import { hashPassword } from '../utils/password.utils'
import { encode } from '../utils/token.utils'
import { ApiError } from '../constants/error.constant'

const getAllUsers = async(): Promise<User[]> => {
    try {
        const resDB = await userRepository.getAllUsers()
        return resDB
    } catch (error) {
        throw error
    }
}

const getUserByUsername = async(username: string): Promise<User | ApiError> => {
    try {
        const resDB = await userRepository.getUserByUsername(username)
        return resDB
    } catch (error) {
        throw error
    }
}

const createUser = async (userData: User): Promise<User | ApiError> => {
    try {
        //[ ] HASHING PASSWORD
        const passwordHashed = await hashPassword(userData.password)
        userData.password = passwordHashed
        
        const resDB = await userRepository.createUser(userData)
        return resDB
    } catch (error) {
        throw error
    }
}

const updateUser = async (userData: User, userId: string): Promise<User | ApiError> => {
    try {
        //[ ] HASHING PASSWORD
        const passwordHashed = await hashPassword(userData.password)
        userData.password = passwordHashed
        
        const resDB = await userRepository.updateUser(userData, userId)
        return resDB
    } catch (error) {
        throw error
    }
}

const authentication = async (loginData: LoginUser): Promise<string | ApiError> => {
    try {
        const resDB = await userRepository.authentication(loginData)
        if ('id' in resDB) {
            const token = await encode({
                id: resDB.id,
                username: resDB.username,
                email: resDB.email
            })
                
            return token
        } else {
            return resDB
        }
    } catch (error) {
        throw error
    }
}


export const userService = {
    getAllUsers,
    getUserByUsername,
    createUser,
    updateUser,
    authentication
}