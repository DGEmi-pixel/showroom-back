import {type Request, type Response, type NextFunction} from 'express'
import { type UserPayLoad } from '../constants/payload.constant'
import { decode } from '../utils/token.utils'

export const isAuthenticated = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
        const bearerToken = req.headers.authorization
        if(!bearerToken || bearerToken === undefined) {
            throw new Error('Unauthorized access, you did not send a token')
        }
        const { id, email, username} = await decode(bearerToken) as UserPayLoad

        (req as any).user = {
            id,
            email,
            username
        }
        next()
    } catch (error) {
        next(error)
    }
}
