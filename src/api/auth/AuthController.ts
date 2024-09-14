import { Request, Response} from "express"
import jwt from 'jsonwebtoken'
import { validateUserData, prepareData, prepareReferalCode, validateLoginData } from "./AuthServices.svc"
import userModel, {IUser} from '../../../models/User'
import { ApiError } from "../../error/ApiError"
import logger from "../../logger"
import path from "path"
const dotenv = require('dotenv')
dotenv.config({path: path.resolve(__dirname, '../../../.env')})


const generateJwt = (email: string, password: string, id: number | undefined) => {
    const secret = process.env.SECRET_KEY;
    if (!secret) {
        throw new Error('SECRET_KEY is not defined in environment variables.')
    }
    
    return jwt.sign(
        {id, email, password},
        secret,
        {expiresIn: '24h'}
    )
}

class AuthController{
    async registration(req: Request,res: Response){
        try{
            const userData: Omit<IUser, 'id' | 'createdAt' | 'updatedAt'> = req.body
            const referralCode = req.query.referralCode as string

            const referralId = await prepareReferalCode(referralCode) //проверяем, есть ли пользователь, если нет - возвращаем undefined
        
            await validateUserData(userData) //проверяем, что все поля заполнены корректно

            const preparedData = await prepareData(userData, referralId) //подготовливаем дату

            let newUser
            try{
                newUser = await userModel.create(preparedData)
            } catch (error){
                logger.error(error)
                throw ApiError.internal('Error creating user')
            }

            const jwt = generateJwt(preparedData.email, preparedData.password, newUser.id)
            logger.info('New user register succesfully')
            return res.json({
                message: 'User registered successfully',
                user: newUser,
                jwt
            });
        }catch(e){
            if (e instanceof ApiError) {
                logger.error(`register error status: ${e.status}`)
                res.status(e.status).json({ message: e.message })
            } else {
                logger.error('Register internal error')
                res.status(500).json({ message: 'Internal server error' })
            }
        }
    }

    async login(req: Request,res: Response){
        const {email, password} = req.body
        try {
            
            const user = await validateLoginData(email, password)
            const token = generateJwt(email, user.password, user.id)

            res.json({
                message: 'Login successful',
                token
            });
        } catch (e) {
            if (e instanceof ApiError) {
                res.status(e.status).json({ message: e.message })
            } else {
                logger.error(e)
                res.status(500).json({ message: 'Internal server error' })
            }
        }
    }
}

export default new AuthController()