import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken';
import prismaClient from "../../prisma";

interface AuthRequest {
    email: string
    password: string
}

class AuthUserService{
    async execute({ email, password }: AuthRequest){
        // verificar se o email existe
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        });

        if (!user){
            throw new Error("User/password incorrect");
            
        }

        // preciso verificar se a senha enviada está correta
        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch){
            throw new Error("User/password incorrect");
            
        };

        // se deu td certo vamos gerar o token pro user
        // gerar um token JWT e devolver os dados do user como id, name e email.
        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}

export default new AuthUserService();