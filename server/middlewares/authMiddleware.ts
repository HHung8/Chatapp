import { NextFunction, Response } from "express";
import jwt  from "jsonwebtoken";
import { CLIENT_AUTH_URL, JWT_SECRET_KEY } from "../src/contants";

export default async function authMiddleware(req:any, res:Response, next:NextFunction) {
    const token = req?.cookies?.token ?? null;
    let verifiedToken;
    try {
        if(token) {
            verifiedToken = await jwt.verify(token, JWT_SECRET_KEY);
            if(!verifiedToken) {
                res
                    .json({message:"No token/token expired"})
                    .redirect(CLIENT_AUTH_URL as string);
            }
            req.user = verifiedToken;
            next();
        } else {
            res
                .json({message: "No token/token expired"})
                .redirect(CLIENT_AUTH_URL as string);
        }
    } catch (error) {
        res.json({message: "No token/token expired"});
        next(error);
    }
}