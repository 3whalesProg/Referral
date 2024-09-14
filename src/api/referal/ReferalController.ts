import { Request, Response } from "express"
import { checkUser } from "../auth/AuthServices.svc"
import userModel from '../../../models/User';
import logger from "../../logger";

class ReferalController{
    public async getUserReferrals(req: Request, res: Response){
        const jwtDecode = await checkUser(req.headers.authorization)
        const data = await userModel.getReferrals(jwtDecode.id)
        logger.info("Get user referrals successfuly")
        res.json(data)
    }
    public async getReferralLink(req: Request, res: Response){
        const jwtDecode = await checkUser(req.headers.authorization)
        logger.info("Get referral link successfuly")
        res.json({refId: `https://frontendlink.com/regstration?referralCode=${jwtDecode.id}`}) //т.к фронта нет делаю фейк ссылку. Соответвенно страница registration должна брать этот параметр и отсылать на сервер
    }
}

export default new ReferalController()