import {type Request, type Response, type NextFunction} from 'express'
import { showRoomService } from '../services/showroom.service'
import { ShowRoom } from '../constants/showroom.constant'

const getShowRoom = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const resDB = await showRoomService.getShowRoom()
        res.status(200).json(resDB)
    } catch (error) {
        next(error)
    }
}

const getAboutInfo = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const resDB = await showRoomService.getAboutInfo()
        res.status(200).json(resDB)
    } catch (error) {
        next(error)
    }
}

const getContactInfo = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const resDB = await showRoomService.getContactInfo()
        res.status(200).json(resDB)
    } catch (error) {
        next(error)
    }
}

const getHomeInfo = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const resDB = await showRoomService.getHomeInfo()
        res.status(200).json(resDB)
    } catch (error) {
        next(error)
    }
}

const createShowRoom = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const resDB = await showRoomService.createShowRoom(req.body as ShowRoom)
        res.status(200).json(resDB)
    } catch (error) {
        next(error)
    }
}

const updateShowRoom = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const resDB = await showRoomService.updateShowRoom(req.body.showroomData as ShowRoom, req.body.idShowroom)
        res.status(200).json(resDB)
    } catch (error) {
        next(error)
    }
}

export const showRoomController = {
    getShowRoom,
    getAboutInfo,
    getContactInfo,
    getHomeInfo,
    createShowRoom,
    updateShowRoom
}