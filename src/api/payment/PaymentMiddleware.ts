import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../../error/ApiError';
import logger from '../../logger'

export const PaymentMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const {amount} = req.body
    if (!amount) {
        logger.error("Payment fileds dosn't required")
        throw ApiError.internal("Fileds dosn't required")
    }
    if (amount < 1000){
        logger.error("Payment fileds insufficient amount")
        throw ApiError.internal('Insufficient amount')
    }
    next() 
};