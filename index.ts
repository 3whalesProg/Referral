import express, { Request, Response, NextFunction } from 'express'
import loggerMiddleware from './src/loggerMiddleware'
import router from './src/routes/index'
import redisClient from './redisClient'
const dotenv = require('dotenv')
import { ApiError } from './src/error/ApiError'
dotenv.config({path:__dirname+'/.env'})
import setupSwagger from './swagger';
const PORT = process.env.PORT || 5001
const app = express()
const http = require('http').Server(app)
import knex from './db'
import logger from './src/logger'

app.use(express.json())
app.use('/api', loggerMiddleware, router)
setupSwagger(app);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
      return res.status(err.status).json({ success: false, message: err.message })
    }
  
    logger.error('Unexpected error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' })
  });

const start = async() =>{
    try{
        const result = await knex.raw('SELECT 1+1 AS result')
        logger.info('Database connection successful')
        logger.info('Query result:', result.rows[0].result)
        const redisTest = await redisClient.ping();
        logger.info(redisTest)
        http.listen(process.env.PORT, () => logger.info('server start'))
    }
    catch(e){
        console.log(e)
    }
}

start()

export default app