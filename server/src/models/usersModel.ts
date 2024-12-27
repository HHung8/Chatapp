import { Request, Response } from "express";
import { prisma } from "../prisma";

export const getAllUsers = async(req:Request, res:Response) => {
    console.log(req);
    const search= req?.body?.search
    try {
        const allUsers = await prisma.user.findMany({
            where: {
                id:{not:{equals: req?.user?.id}},
                OR: search ? [
                    {email:{contains:search,mode:"insensitive"}},
                    {name: {contains:search,mode:"insensitive"}}
                ] : undefined,
            },
            orderBy: {name:"desc"}, 
            select:{
                id:true,
                name:true,
                email:true,
                createdAt:true,
                imageId: true,
                imageUrl: true,
            }
        });
        return res.json(allUsers);
    } catch (error) {
        console.log(error);
        return res.json({error:error?.toString()})
    }
}