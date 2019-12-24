import { Response, NextFunction } from 'express';

import {User} from '../models';

import {IRequest} from '../types';

const ADMIN_ID = 1;

const userController = {
    addAdminToReq: (req: IRequest, _: Response, next: NextFunction): void => {
        User.findByPk(ADMIN_ID)
            .then((admin) => {
                req.user = admin;
                next();
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

export {userController, ADMIN_ID};
