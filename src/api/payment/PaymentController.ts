import { Request, Response} from "express"
import { checkUser } from "../auth/AuthServices.svc"
import userModel from "../../../models/User"
import logger from "../../logger"

class PaymentController{
    public async buyAbonement(req: Request, res: Response){
        //по хорошему брать данные кредитной карты, cvv и так далее, где-то вообще используется редирект, зависит от api
        //реальноно банка нет, поэтому буду просто проверять, что сумма больше 1000
        const jwtDecode = await checkUser(req.headers.authorization)
        const data = await userModel.setSubscriber(jwtDecode.id)
        logger.info('Payment abonement successfuly')
        return res.status(200).json(data)
    }
}

export default new PaymentController