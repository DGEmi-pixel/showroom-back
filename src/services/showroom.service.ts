import { showRoomRepository } from "../repositories/showroom.repository";
import { ShowRoom, About, Contact, Home } from "../constants/showroom.constant";
import { ApiError } from "../constants/error.constant";

const getShowRoom = async (): Promise<ShowRoom | ApiError> => {
    try {
        const resDB = await showRoomRepository.getShowRoom()
        return resDB
    } catch (error) {
        throw error
    }
}

const getAboutInfo = async (): Promise<About | ApiError> => {
    try {
        const resDB = await showRoomRepository.getAboutInfo()
        return resDB
    } catch (error) {
        throw error
    }
}

const getHomeInfo = async (): Promise<Home | ApiError> => {
    try {
        const resDB = await showRoomRepository.getHomeInfo()
        return resDB
    } catch (error) {
        throw error
    }
}

const getContactInfo = async (): Promise<Contact | ApiError> => {
    try {
        const resDB = await showRoomRepository.getContactInfo()
        return resDB
    } catch (error) {
        throw error
    }
}

const createShowRoom = async (showroomData: ShowRoom): Promise<ShowRoom | ApiError> => {
    try {
        const resDB = await showRoomRepository.createShowRoom(showroomData)
        return resDB
    } catch (error) {
        throw error
    }
}

const updateShowRoom = async (showroomData: ShowRoom, showroomId: string): Promise<ShowRoom | ApiError> => {
    try {
        const resDB = await showRoomRepository.updateShowRoom(showroomData, showroomId)
        return resDB
    } catch (error) {
        throw error
    }
}

export const showRoomService = {
    getShowRoom,
    getAboutInfo,
    getContactInfo,
    getHomeInfo,
    createShowRoom,
    updateShowRoom
}