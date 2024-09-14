import { Router } from "express"
import ReferalController from "../api/referal/ReferalController"
const router = Router()

/**
 * @swagger
 * /referal/getUserRef:
 *   get:
 *     summary: Получение рефералов пользователя
 *     description: Возвращает список рефералов для текущего пользователя.
 *     responses:
 *       200:
 *         description: Список рефералов пользователя
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   email:
 *                     type: string
 *                     example: referral@example.com
 *                   firstName:
 *                     type: string
 *                     example: John
 *                   secondName:
 *                     type: string
 *                     example: Doe
 *                   thirdName:
 *                     type: string
 *                     example: Smith
 *       401:
 *         description: Неавторизованный доступ
 */
router.get('/getUserRef', ReferalController.getUserReferrals)

/**
 * @swagger
 * /referal/getReferralLink:
 *   get:
 *     summary: Получение реферальной ссылки
 *     description: Возвращает реферальную ссылку для текущего пользователя.
 *     responses:
 *       200:
 *         description: Реферальная ссылка
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 referralLink:
 *                   type: string
 *                   example: "http://example.com/referral?code=abcd1234"
 *       401:
 *         description: Неавторизованный доступ
 */
router.get('/getReferralLink', ReferalController.getReferralLink)

export default router