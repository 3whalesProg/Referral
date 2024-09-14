import { Request, Response} from "express"
import lessonModel from "../../../models/Lessons"
import { checkUser } from "../auth/AuthServices.svc"
import { ApiError } from "../../error/ApiError"
import userModel from "../../../models/User"
import lessonUser from "../../../models/LessonUser"
import logger from "../../logger"
import redisClient from "../../../redisClient"

class LessonsController{
    public async getAllLessons(req: Request, res: Response){
        const {offset} = req.query
        try{
            const cacheKey = `lessons:${offset || 0}`;

            const cachedData = await redisClient.get(cacheKey);

            if (cachedData) {
                logger.info('Cache hit: Returning cached lessons');
                return res.json(JSON.parse(cachedData));
            }
            const data = await lessonModel.getAll(offset)

            try {
                await redisClient.set(cacheKey, JSON.stringify(data), 'EX', 3600);
            } catch (setError) {
                logger.error('Error setting data to Redis:', setError);
            }
            logger.info('All lessons get successfuly')
            res.json(data)
        } catch(error){
            ApiError.internal('Internal error')
        }

    }
    public async getUserLessons(req: Request, res: Response){
        try{
            const jwtDecode = await checkUser(req.headers.authorization)
            const data = await userModel.getLessons(jwtDecode.id)
            logger.info('All user lessons get successfuly')
            res.json(data)
        } catch(error){
            logger.error('Get user lessons error')
            ApiError.internal('Internal error')
        }
    }

    public async сlassSignup(req: Request, res: Response){
        try{
            const jwtDecode = await checkUser(req.headers.authorization)
            const {lesson_id} = req.body
            const user_id = jwtDecode.id
            const data= await lessonUser.сlassSignup(lesson_id, user_id)
            logger.info('Register to lesson successfuly')
            return res.status(200).json(data)
        } catch(error){
            logger.error('Register to lesson failed')
            ApiError.internal('Internal error')
        }
    }
}

export default new LessonsController