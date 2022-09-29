import prismaClient from "../../prisma";

interface CategoryRequest{
    category_id: string;
}

class ListByCategoryService{
    async execute({category_id}: CategoryRequest){
        const listProduct = await prismaClient.product.findMany({
            where:{
                category_id: category_id,
            }
        })

        return listProduct
    }
};

export {ListByCategoryService};