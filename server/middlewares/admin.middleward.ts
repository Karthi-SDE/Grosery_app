import { Request, Response, NextFunction } from 'express';

export const adminAccessMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    try {
         let user:any = req.user
        if (user && user.role === 'user') {
            res.status(403).send({
                message: 'Only admin can access'
            });
        } else if (user && user.role === 'admin') {
            next();
        }
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};
export const userAccessMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    try {
         let user:any = req.user
        if (user && user.role === 'admin') {
            res.status(403).send({
                message: 'Only user can access'
            });
        } else if (user && user.role === 'user') {
            next();
        }
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};
