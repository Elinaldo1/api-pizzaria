import { Request, response, Response } from 'express';
import CreateUserService from '../../services/user/CreateUserService';

class CreateUserController {
    async handle(req: Request, res: Response){
    
        const {name, email, password} = req.body;

        const user = await CreateUserService.execute({name, email, password});
        return res.json(user);
    }
}

export default new CreateUserController();