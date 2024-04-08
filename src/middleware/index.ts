import { NextFunction, Request, Response, response } from "express";
import jwt from 'jsonwebtoken';
import User from "../models/user-model";

export interface AuthRequest extends Request {
    userId: string;
}
export const authenticationMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json({ error: "Authorization required" });
        }

        const token = authorization;
        const { _id } = jwt.verify(token, "express");
        const existingUser = await User.findOne({ _id }).exec();
        if (existingUser) {
            req.userId = existingUser.id;
        }
        next()
    } catch (error) {

    }
}