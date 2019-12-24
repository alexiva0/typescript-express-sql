import { Request } from 'express';
import { User } from '../models';

export interface IRequest extends Request {
    user: User;
}
