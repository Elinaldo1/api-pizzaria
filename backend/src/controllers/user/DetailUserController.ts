import { Request, Response } from 'express';
import DetailUserSerService from '../../services/user/DetailUserSerService';

class DetailUserController {
    async handle(req: Request, res: Response) {

        const { user_id } = req;


        const user =await DetailUserSerService.execute(user_id);

        return res.json(user)
    }
}

export default new DetailUserController();