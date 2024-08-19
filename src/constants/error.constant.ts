import { Contact } from "./showroom.constant"
import { Product } from "./product.constant"
import { ShowRoom } from "./showroom.constant"
import { User } from "./user.constant"

export interface ApiError {
    error?: boolean,
    data?: Contact | Product | ShowRoom | User
    message: string,
    statusCode: number,
    details?: any,
}