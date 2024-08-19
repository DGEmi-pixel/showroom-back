import {Schema, model} from 'mongoose'
import { User } from '../../constants/user.constant'

const userSchema = new Schema<User>(
    {
        name: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        logoUrl: {
            type: String,
            required: false
        },
    }, {timestamps: true},
)

const userModel = model<User>('user', userSchema)

export {userModel}