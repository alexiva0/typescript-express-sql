import { Response } from 'express';
import { IRequest } from '../types';


const errorController = {
    getErrorPage: (_: IRequest, res: Response): void => {
        res
            .status(404)
            .render('404', {title: 'Page not found'});
    }
};

export { errorController };
