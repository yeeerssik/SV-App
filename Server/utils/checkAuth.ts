import jwt from 'jsonwebtoken'
import { Response, NextFunction, Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

interface RequestWithUserId extends Request {
    userId?: any,
}
export default (req: RequestWithUserId, res: Response, next: NextFunction) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    if (token) {
        try {
            const { _id } = jwt.verify(token, 'secret123') as JwtPayload;
            // console.log(_id);
            req.userId = _id;
            next();
        } catch (err) {
            return res.status(403).json({
                message: "Access forbidden"
            });
        }
    } else {
        return res.status(403).json({
            message: "Access forbidden"
        });
    }
    

    // next();
} 