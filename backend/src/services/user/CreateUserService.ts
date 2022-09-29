import { hash } from 'bcryptjs';
import prismaClient from "../../prisma";

interface UserRequest{
    name: string
    email: string
    password: string
}

class CreateUserService {
    async execute({name, email, password}: UserRequest){

        // verificar se enviou email
        if(!email) {
            throw new Error("email incorrect");
            
        }

        // verifica se email já está cadatrado
        const userAlreadExists = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if (userAlreadExists){
            throw new Error("user already exists");
            
        } 

        const passwordHash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data:{
                name: name ,
                email: email,
                password: passwordHash
            },
            select:{
                id: true,
                name: true,
                email: true
            }
        })
        return {user}
    }
}

export default new CreateUserService();