const bcrypt = require('bcrypt')
import userModel, {IUser} from '../../../models/User';
import validator from 'validator'
import { ApiError } from "../../error/ApiError"
import jwt, { JwtPayload } from 'jsonwebtoken'
import logger from '../../logger';
import path from "path";
const dotenv = require('dotenv')
dotenv.config({path: path.resolve(__dirname, '../../../.env')})

export const checkUser = async (header: any) => {
    try {
        const secret = process.env.SECRET_KEY;
        if (!secret) {
            logger.error('Secret key not defined in environment variables');
            throw ApiError.internal('Server error: Secret key is missing');
        }
        const token = header.split(' ')[1];
        const decoded = jwt.verify(token, secret) as JwtPayload;
        return decoded
      } catch (error) {
        logger.error('Error in checkUser:', error)
        throw ApiError.unauthorized('Invalid token')
      }
}

export const prepareData = async (data: Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>, referredBy?: number): Promise<IUser> => {
    try{
        const { firstName, secondName, thirdName, email, password } = data;

        const capitalize = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

        const trimmedFirstName = firstName.trim();
        const trimmedSecondName = secondName.trim();
        const trimmedThirdName = thirdName.trim();
        const trimmedEmail = email.trim();

        const capitalizedFirstName = capitalize(trimmedFirstName);
        const capitalizedSecondName = capitalize(trimmedSecondName);
        const capitalizedThirdName = capitalize(trimmedThirdName);

        const hashedPassword = await bcrypt.hash(password.trim(), 10)
        return {
            email: trimmedEmail,
            firstName: capitalizedFirstName,
            secondName: capitalizedSecondName,
            thirdName: capitalizedThirdName,
            password: hashedPassword,
            isSubscriber: false,
            referredBy: referredBy ? referredBy : null
          };
    } catch(error){
        logger.error(error)
        throw ApiError.internal('Something wrong with your data')
    }
};

export const validateUserData = async (data: Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> => {
        const { firstName, secondName, thirdName, email, password } = data;

        if (password.length <= 4) throw ApiError.badRequest('Password must be longer than 4 characters')
        
        if (!validator.isEmail(email)) throw ApiError.badRequest('Invalid email format')
          
        if (!firstName.trim() || !secondName.trim() || !thirdName.trim()) throw ApiError.badRequest('All fields are required')
  };

export const prepareReferalCode = async(referralCode: string) => {
    let referralId
    if (referralCode){
        referralId = parseInt(referralCode, 10)
        const referred = await userModel.getById(referralId)
        if (!referred){
            return undefined
        }
        return referralId
    } else return referralId
}

export const validateLoginData = async(email: string, password: string): Promise<IUser> => {
        if (!email || !password) {
            logger.error('Email and password are required')
            throw ApiError.badRequest('Email and password are required')
        }
    
        const user = await userModel.getByEmail(email);
        if (!user) {
            logger.error('Invalid email or password')
            throw ApiError.unauthorized('Invalid email or password')
        }
    
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            logger.error('Invalid email or password')
            throw ApiError.unauthorized('Invalid email or password')
        }
        return user
    
}