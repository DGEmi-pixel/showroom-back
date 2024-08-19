import { type Request, type Response, type NextFunction } from "express"
import { aboutService } from "../services/about.service"
import { About } from "../constants/about.constant"

const getAbout = async (_req: Request, res: Response, next:NextFunction): Promise<void> => {
    try {
        const resDB = await aboutService.getAbout()
        res.json(resDB)
    } catch (error) {
        next(error)
    }
}

const updateAbout = async (req: Request, res: Response, next:NextFunction): Promise<void> => {
    try {
        const resDB = await aboutService.updateAbout(req.params.id, req.body as About)
        res.json(resDB)
    } catch (error) {
        next(error)
    }
}

export const aboutController = {
    getAbout,
    updateAbout
}
