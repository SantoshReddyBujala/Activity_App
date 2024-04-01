import { Request, Response } from "express";
import User from "../models/user-model";
import bcrypt from "bcrypt";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import IUser from "../types";



const getUserToken = (_id: string | Types.ObjectId) => {
    const authUserToken = jwt.sign({ _id }, "express", { expiresIn: "7d", })
    return authUserToken;
}
export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email: email }).exec();
        if (existingUser) {
            return res.status(409).send('User already exits');
        }
        const hashPassowrd = await bcrypt.hash(password, 10);
        const user = await User.create({
            name: name,
            email: email,
            password: hashPassowrd
        });

        return res.status(201).send({ message: 'User created successfully' })

    } catch (error) {
        console.log('Error while create user');
        throw (error)
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password }: IUser = req.body;
        const existingUser = await User.findOne({ email: email }).exec();
        if (!existingUser) {
            res.status(409).send({ message: 'User does not exits' });
        }

        const isPasswordIdentical = await bcrypt.compare(password, existingUser.password);
        if (isPasswordIdentical) {
            const token = getUserToken(existingUser._id);

            return res.send({
                token,
                user: {
                    email: existingUser.email,
                    name: existingUser.name
                }
            })
        } else {
            return res.status(400).send({ messagge: 'Password does not match' });
        }
    } catch (error) {

    }
}
