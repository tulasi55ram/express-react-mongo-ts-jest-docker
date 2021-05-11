import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import StatusCodes from 'http-status-codes'; 
import { IUser } from '../../../models/mongoose/user/types';
import User from '../../../models/mongoose/user'

const router: Router = Router();

router.post('/', async(req: Request, res: Response, next: NextFunction ) => {
    try {
        const { first_name, last_name, email, password, role, avatar } = req.body;
        const userEmail = email.toLowerCase();
        const user = await User.findOne({ email: userEmail }).exec();
        if (user) {
            return res.status(400).json({
                message: 'User Already Exists',
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const data: IUser = {
            first_name,
            last_name,
            email,
            password: hashedPassword,
            role,
            avatar
        };
        const docs = await new User(data).save();
        return res.status(StatusCodes.OK).json({ email });
    } catch(e){
        next(e);
    }
});

export default router;