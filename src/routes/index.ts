import { Router } from "express"
import authRouter from './authRouter'
import referalRouter from './referalRouter'
import lessonRouter from './lessonRouter'
import paymentRouter from './paymentRouter'
import { AuthMiddleware } from "../api/auth/AuthMiddleware"
const router = Router()

router.use('/auth', authRouter)
router.use('/referal', AuthMiddleware, referalRouter)
router.use('/lesson', AuthMiddleware, lessonRouter)
router.use('/payment', AuthMiddleware, paymentRouter)

export default router