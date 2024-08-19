import { aboutModel } from "../db/models/about.model"
import { About } from "../constants/about.constant"
import { ApiError } from "../constants/error.constant"

const getAbout = async (): Promise<About | string> => {
    try {
        const about = await aboutModel.findOne()
        if(!about) {
            return "No se ha encontrado ningún registro"
        }
        return about
    } catch (error) {
        throw error
    }
}

const updateAbout = async (id: string, about: About): Promise<About | ApiError> => {
    try {
        const aboutUpdated = await aboutModel.updateOne({_id: id}, about)

        console.log(aboutUpdated)

        if(aboutUpdated.matchedCount !== 0) {
            return ({
                error: false,
                message: 'Información actualizada',
                statusCode: 200,
            })
        } else {
            return ({
                error: false,
                message: 'Error, no se ha podido actualizar la sección',
                statusCode: 500,
                details: aboutUpdated
            })
        }
    } catch (error) {
        throw error
    }
}


export const aboutRepository = {
    getAbout,
    updateAbout
}