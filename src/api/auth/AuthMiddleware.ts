import { Request, Response, NextFunction } from 'express'
import jwt, {JwtPayload} from 'jsonwebtoken'
import { ApiError } from '../../error/ApiError';
import logger from '../../logger'
import path from "path"
const dotenv = require('dotenv')
dotenv.config({path: path.resolve(__dirname, '../../../.env')})


declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload; 
        }
    }
}

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        logger.error('Unauthorized: No token provided')
        throw ApiError.unauthorized('Unauthorized: No token provided')
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
        logger.error('Unauthorized: No token provided')
        throw ApiError.unauthorized('Unauthorized: No token provided')
    }

    const secret = process.env.SECRET_KEY
    if (!secret) {
        logger.error('Secret key not defined in environment variables')
        throw ApiError.internal('Server error: Secret key is missing')
    }

    try {
        const decoded = jwt.verify(token, secret) as JwtPayload
        req.user = decoded
        next()
    } catch (error) {
        logger.error('Unauthorized: Invalid token')
        throw ApiError.unauthorized('Unauthorized: Invalid token')
    }
};