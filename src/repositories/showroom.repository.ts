import { showroomModel } from "../db/models/showroom.model"
import { ShowRoom, About, Contact, Home } from "../constants/showroom.constant"
import { ApiError } from "../constants/error.constant"

const getShowRoom = async (): Promise<ShowRoom | ApiError> => {
    try {
        const showroom = await showroomModel.findOne()
        if(showroom){
            return showroom
        } else {
            return ({
                message: 'Error, no se ha obtenido datos',
                statusCode: 500,
                details: showroom
            })
        }
    } catch (err) {
        throw err
    }
}

const getAboutInfo = async (): Promise<About | ApiError> => {
    try {
        const about = await showroomModel.findOne({}, {titleAbout: 1, historyAbout: 1, imageUrl: 1})
        if(about) {
            return about
        } else {
            return ({
                message: 'Error, no se obtuvo existencias',
                statusCode: 500,
                details: about
            })
        }
    } catch (err) {
        throw err
    }
}

const getContactInfo = async (): Promise<Contact | ApiError> => {
    try {
        const contacInfo = await showroomModel.findOne({}, {phoneNumber: 1, country: 1, socialMedia: 1, supportMail: 1})
        if(contacInfo){
            return ({
                error: false,
                data: contacInfo,
                statusCode: 200,
                message: ''
            })
        } else {
            return ({
                error: true,
                message: 'Error, no se ha obtenido la información de contacto',
                statusCode: 500,
                details: contacInfo
            })
        }
    } catch (error) {
        throw error
    }
}

const getHomeInfo = async (): Promise<Home | ApiError> => {
    try {
        const homeInfo = await showroomModel.findOne({}, {name: 1, description: 1})
        if(homeInfo){
            return ({
                error: false,
                data: homeInfo,
                statusCode: 200,
                message: ''
            })
        } else {
            return ({
                error: true,
                statusCode: 500,
                message: 'Error, no se ha obtenido la información del home',
                details: homeInfo
            })
        }
    } catch (error) {
        throw error
    }
}

const createShowRoom = async (showroomData: ShowRoom): Promise<ShowRoom | ApiError> => {
    try {
        const showroom = await showroomModel.create(showroomData)
        if(showroom){
            return showroom
        } else {
            return ({
                message: 'Error, no se ha creado ningún showroom',
                statusCode: 500,
                details: showroom
            })
        }
    } catch (err) {
        throw err
    }
}

const updateShowRoom = async (showroomData: ShowRoom, showroomId: string): Promise<ShowRoom | ApiError> => {
    try {
        const showroom = await showroomModel.findByIdAndUpdate(showroomId, showroomData)
        console.log(showroom)
        if(showroom){
            return ({
                error: false,
                message: 'Información de la sección actualizada',
                statusCode: 200,
                data: showroom
            })
        } else {
            return ({
                error: true,
                message: 'Error, imposible actualizar el showroom',
                statusCode: 500,
                details: showroom
            })
        }
    } catch (err) {
        throw err
    }
}

export const showRoomRepository = {
    getShowRoom,
    getAboutInfo,
    getContactInfo,
    getHomeInfo,
    createShowRoom,
    updateShowRoom
}