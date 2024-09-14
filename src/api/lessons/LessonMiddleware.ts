import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../../error/ApiError'
import { checkUser } from "../auth/AuthServices.svc"
import lessonModel from "../../../models/Lessons"
import lessonUser from "../../../models/LessonUser"
import userModel from '../../../models/User'
import logger from '../../logger'

export const classSignUpMiddleware = async(req: Request, res: Response, next: NextFunction) => {
    const {lesson_id} = req.body
    if (!lesson_id){
        logger.error("Fileds dosn't required")
        return next(ApiError.internal("Fileds dosn't required"))
    }
    const jwtDecode = await checkUser(req.headers.authorization)
    const user_id = jwtDecode.id
    const isExist = await lessonUser.existsSingUp(lesson_id, user_id)

    if (isExist){
        logger.error('You are allready register on this lesson')
        return next(ApiError.badRequest('You are allready register on this lesson'))
    } 
    const lesson = await lessonModel.getById(lesson_id);
    if (!lesson){
        logger.error("lesson dosn't exist")
        return next(ApiError.badRequest("lesson dosn't exist"))
    }
    const user = await userModel.getById(jwtDecode.id)
    if (user){
        if (lesson.type != 'free' && !user.isSubscriber){
            logger.error("Please buy abonement")
            return next(ApiError.badRequest("Please buy abonement"))
        }
    }

    next() 
};