import {type Request, type Response, type NextFunction} from 'express'
import { ApiError } from "../constants/error.constant"

export const errorHandler = (err: ApiError, _req: Request, res: Response) => {
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({
        message: err.message,
        statusCode,
        details: err.details || null
    })
}