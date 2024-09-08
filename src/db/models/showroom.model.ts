import {Schema, model} from 'mongoose'
import { ShowRoom } from '../../constants/showroom.constant'

const showroomSchema = new Schema<ShowRoom>(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        },
        historyAbout: {
            type: String,
            required: true
        },
        titleAbout: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },
        supportMail: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        socialMedia: {
            facebook: {
                type: String,
                required: true
            },
            whatsapp: {
                type: String,
                required: true
            },
            instagram: {
                type: String,
                required: true
            }
        }
    }, {timestamps: true}
)

const showroomModel = model<ShowRoom>('showroom', showroomSchema)

export {showroomModel}