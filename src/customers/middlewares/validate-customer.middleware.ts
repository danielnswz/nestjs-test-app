import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ValidateCustomerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('Hello from ValidateCustomerMiddleware');
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(HttpStatus.UNAUTHORIZED).send({ msg: 'Unauthorized' });
        }

        next();
    }
}
