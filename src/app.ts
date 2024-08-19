import express from 'express'
import {type Request, type Response, type NextFunction} from 'express'
import cors from 'cors'
import { svConfig } from './config/config'
import indexRouter from './routes/index.route'
import connectDb from './db/index.db'
import { errorHandler } from './middleware/error.middleware'
import { ApiError } from './constants/error.constant'

const app = express();

(async () => {
    try {
        app.use(express.json())
        app.use(cors())
        app.use('/api', indexRouter)

        await connectDb()

        const port = svConfig.port ?? 3000

        app.set('trust proxy', true) //Habilitar confianza en las cabeceras proxy
    
        //[ ] IMPLEMENTACIÓN DEL ERROR HANDLER
        app.use((err: ApiError, req: Request, res: Response) => {
            errorHandler(err, req, res)
        })

        app.listen(port, () => {
            console.log(`Server on port ${port}`)
        })

    } catch (error) {
        console.log(error);
    }
})();

