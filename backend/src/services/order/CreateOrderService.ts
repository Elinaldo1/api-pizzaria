import prismaClient from "../../prisma";

interface OrderRequest{
    table: number;
    name: string;
}
class CreateOrdserService{
   async execute ({table, name}: OrderRequest){
       
        const order = await prismaClient.order.create({
            data:{
                table,
                name,
                
            }
        })

        return order;

   }
}

export { CreateOrdserService };

