import prismaClient from "../../prisma";

interface CategoryRequest{
    name: string;
}

class CreateCategoryService{
    async execute({name}: CategoryRequest){

        const categoryAlreadyExists = await prismaClient.category.findFirst({
            where: {
                name
            },
            select: {
                name: true
            }
        });
        
        if (name === '') {
            throw new Error('Name invalid');
        };
        
        if(name === categoryAlreadyExists?.name) {
            throw new Error('Category already exists');
        };
        console.log('name3',name);

        const category = await prismaClient.category.create({
            data:{
                name,
            }
        })
        // console.log('category')
        return category;
    }
}

export { CreateCategoryService };

