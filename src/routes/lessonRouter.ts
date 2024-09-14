import { Router } from "express"
import LessonsController from "../api/lessons/LessonsController"
import { classSignUpMiddleware } from "../api/lessons/LessonMiddleware"
const router = Router()

/**
 * @swagger
 * /lesson/getAllLessons:
 *   get:
 *     summary: Получение всех уроков
 *     description: Возвращает список всех доступных уроков.
 *     responses:
 *       200:
 *         description: Список всех уроков
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
 *                   subject:
 *                     type: string
 *                     example: Math
 *                   description:
 *                     type: string
 *                     example: Advanced mathematics lessons
 *                   scheduled_date:
 *                     type: string
 *                     format: date
 *                     example: 2024-09-15
 *                   type:
 *                     type: string
 *                     example: subscription
 */
router.get('/getAllLessons', LessonsController.getAllLessons)

/**
 * @swagger
 * /lesson/getUserLessons:
 *   get:
 *     summary: Получение уроков пользователя
 *     description: Возвращает список уроков, на которые записан пользователь.
 *     responses:
 *       200:
 *         description: Список уроков пользователя
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
 *                   subject:
 *                     type: string
 *                     example: Math
 *                   description:
 *                     type: string
 *                     example: Advanced mathematics lessons
 *                   scheduled_date:
 *                     type: string
 *                     format: date
 *                     example: 2024-09-15
 *                   type:
 *                     type: string
 *                     example: subscription
 */
router.get('/getUserLessons', LessonsController.getUserLessons)

/**
 * @swagger
 * /lesson/signUpToLesson:
 *   post:
 *     summary: Записаться на урок
 *     description: Позволяет пользователю записаться на урок.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lesson_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Успешная регистрация на урок
 *       400:
 *         description: Ошибка регистрации на урок
 *       401:
 *         description: Пользователь не авторизован
 *       403:
 *         description: Пользователь не подписан на абонемент
 */
router.post('/signUpToLesson', classSignUpMiddleware, LessonsController.сlassSignup)

export default router