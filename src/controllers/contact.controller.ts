import {type Request, type Response, type NextFunction} from 'express'
import { contactService } from "../services/contact.service"
import { ContactProps } from '../constants/contact.constant'

const sendMail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { to, name, subject, text }: ContactProps = req.body
        const resDB = await contactService.sendMail(to, name, subject, text)
        res.status(200).json(resDB)
    } catch (error) {
        next(error)
    }
}

export const contactController = {
    sendMail
}