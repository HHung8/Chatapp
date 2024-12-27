import { Request, Response } from "express";
import { prisma } from "../prisma";
import { io } from "../socket/socket";

export const createMessage = async(req:Request, res:Response) => {
    try {
        const message = await prisma.message.create({
            data: {
                ...req?.body?.messageBody,
                sender:{connect:{id:req?.body?.senderId}},
                conversation:{connect:{id:req?.body?.conversationId}}
            },
            include: {sender: {include:{user:{select:{id:true, imageUrl:true, email:true, name:true}}}}}
        });
        io.to(req?.body?.conversationId).emit("new Message", message)
        return res.json(message);
    } catch (error) {
        console.log(error);
        return res.json({error:error?.toString()})
    }
}

export const getMessages = async(req:Request, res:Response) => {
    try {
        const message = await prisma.message.findMany({
            where:{conversationId:req?.body.conversationId},
            include:{
                sender:{
                    include:{
                        user:{
                            select:{id:true, imageUrl:true, email:true, name:true},
                        }
                    }
                }
            }
        })
        return res.json(message)
    } catch (error) {
        console.log(error);
        return res.json({error:error?.toString()});
    }
}

export const deleteMessage = async(req:Request, res:Response) => {
    try {
        const message = await prisma.message?.findFirst({
            where:{id:req?.body?.message?.id},
            include: {
                conversation: {
                    include:{members:{include:{user:{select:{id:true}}}}}
                }
            }
        });
        const member = await prisma.member.findFirst({
            where:{id:message?.senderId},
        })
        if(member?.userId !== req?.user?.id) {
            return res.json({message: "You are not allowed to delete this message"})
        };
        await prisma.message.delete({where:{id:req?.body?.message?.id}});
        return res.json(message)
    } catch (error) {
        console.log(error);
        return res.json({error:error?.toString()})
    }
  
}