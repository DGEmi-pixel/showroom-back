import {type Request, type Response, type NextFunction} from 'express'
import { userService } from '../services/user.service'
import { User, LoginUser } from '../constants/user.constant'

const getAllUsers = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const resDB = await userService.getAllUsers()
        res.status(200).json(resDB)
    } catch (error) {
        next(error)
    }
}

const getUserByUsername = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const resDB = await userService.getUserByUsername(req.body.username as string)
        res.status(200).json(resDB)
    } catch (error) {
        next(error)
    }
}

const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const resDB = await userService.createUser(req.body as User)
        res.status(200).json(resDB)
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const resDB = await userService.updateUser(req.body.userData as User, req.body.userId)
        res.status(200).json(resDB)
    } catch (error) {
        next(error)
    }
}

const login = async (req: Request, res:Response, next: NextFunction): Promise<void> => {
    try {
        const resDB = await userService.authentication(req.body as LoginUser)
        res.status(200).json(resDB)
    } catch (error) {
        next(error)
    }
}

export const userController = {
    getAllUsers,
    getUserByUsername,
    createUser,
    updateUser,
    login
}