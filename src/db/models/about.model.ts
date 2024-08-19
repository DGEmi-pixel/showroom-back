import {Schema, model} from 'mongoose'
import { About } from '../../constants/about.constant'

const aboutSchema = new Schema<About>(
    {
        imgURL: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        }
    }
)

const aboutModel = model<About>('about', aboutSchema)
export {aboutModel}