import { Prisma } from "@prisma/client";
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from "../contants";


export default async function generateToken(user:Prisma.UserCreateInput) {
    const token = jwt.sign({
        email: user?.email,
        id: user?.id,
        name: user?.name,
        imageUrl: user?.imageUrl,
    },
    JWT_SECRET_KEY,
    {expiresIn: "7d"},
 );
    return token;
}