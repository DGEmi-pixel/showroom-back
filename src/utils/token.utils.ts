import JWT, {type JwtPayload} from 'jsonwebtoken'
import { authConfig } from "../config/config"
import { UserPayLoad } from '../constants/payload.constant'

const signature = authConfig.jwtSecret

const encode = async (payload: UserPayLoad): Promise<string> => {
    try {
        if(signature) {
            const token = JWT.sign(payload, signature /* {expiresIn: '1h'} */)
            return token
        } else {
            throw new Error('La clave secreta no está definida o está vacía')
        }
    } catch (error) {
        console.error('Error al decodificar el token: ', error)
        throw new Error('Error al generar el token JWT')
    }
}

const decode = async (bearerToken: string): Promise<JwtPayload | undefined> => {
    const token = bearerToken.split(' ')[1] //eliminamos la palabra reservada 'bearer'

    try {
        if(signature) {
            const decoded = JWT.verify(token, signature) as JwtPayload
            return decoded
        } else {
            throw new Error('la clave secreta no está definida o está vacía')
        }
    } catch (error) {
        console.error('Error al decodificar el token: ', error)
        throw new Error('Error al decodificar el token')
    }
}

export {encode , decode}