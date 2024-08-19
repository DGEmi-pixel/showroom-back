import { aboutRepository } from "../repositories/about.repository"
import { About } from "../constants/about.constant"
import { ApiError } from "../constants/error.constant"

const getAbout = async (): Promise<About | string> => {
    try {
        const resDB = await aboutRepository.getAbout()
        return resDB
    } catch (error) {
        throw error
    }
}

const updateAbout = async (id: string, about: About): Promise<ApiError | About> => {
    try {
        const resDB = await aboutRepository.updateAbout(id, about)
        return resDB
    } catch (error) {
        throw error
    }
}

export const aboutService = {
    getAbout,
    updateAbout
}