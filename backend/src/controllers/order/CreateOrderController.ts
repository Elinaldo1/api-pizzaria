import { Request, Response } from "express";
import { CreateOrdserService } from "../../services/order/CreateOrderService";

class CreateOrderController {
    async handle(req: Request, res: Response){

        const {table, name} = req.body;

        const createOrderservice = new CreateOrdserService();

        const order = await createOrderservice.execute({
            table,
            name
        });

        return res.json(order);
    }
}

export { CreateOrderController };
