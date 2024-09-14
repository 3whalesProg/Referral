import { Router } from "express"
import PaymentController from "../api/payment/PaymentController"
import { PaymentMiddleware } from "../api/payment/PaymentMiddleware"
const router = Router()

/**
 * @swagger
 * /payment/buyAbonement:
 *   post:
 *     summary: Оплата абонемента
 *     description: Обрабатывает покупку абонемента. Возвращает успех, если amount больше 1000.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 1200
 *                 description: Сумма платежа
 *     responses:
 *       200:
 *         description: Успех, если сумма платежа больше 1000
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Ошибка, если сумма платежа меньше или равна 1000
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Amount must be greater than 1000"
 */
router.post('/buyAbonement', PaymentMiddleware, PaymentController.buyAbonement)

export default router