import { Response } from "express";
import Category from '../models/category-model';
import { ICategory } from "../types";
import { AuthRequest } from "../middleware";

export const getAllCategories = async (req: AuthRequest, res: Response) => {
    try {
        const { userId } = req;
        const categories = await Category.find({ user: userId }).exec();
        return res.send(categories);
    } catch (error) {
        console.log('Error in Get Categories', error);
    }
}

export const createCategory = async (req: AuthRequest, res: Response) => {
    try {
        const { name, isEditable, color, icon }: ICategory = req.body;

        const { userId } = req;

        const category = await Category.create({
            name: name,
            user: userId,
            isEditable: isEditable,
            color: color,
            icon: icon
        });
        return res.status(201).send({ message: 'Category created successfully' })

    } catch (error) {
        console.log('Error while create Category');
        res.send({ error: "Error While create Category" });
        throw (error)
    }
}

export const deleteCategory = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        await Category.findOne({ _id: id });
        res.send({ message: "Category Deleted" });
    } catch (error) {
        console.log('Error occurs while delete category');
        res.send({ error: "Category Deleted" });
    }
}

export const getCategory = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const category = await Category.findOne({ _id: id }).exec();
        res.send(category);
    } catch (error) {
        console.log('Error occurs while det category by id');
        res.send({ error: "Get Category" });
    }
}

export const updateCategory = async (req: AuthRequest, res: Response) => {
    try {
        const { _id, name, isEditable, color, icon }: ICategory = req.body;

        if (!_id) {
            return res.status(400).json({ message: "ID parameter required." });
        }

        const findCategory = await Category.findOne({ _id }).exec();
        if (!findCategory) {
            return res
                .status(204)
                .json({ message: `No category Matches ${_id} not found` });
        }

        const { userId } = req;

        const category = await Category.updateOne(
            { _id: _id },
            {
                $set:
                {
                    name: name,
                    user: userId,
                    isEditable: isEditable,
                    color: color,
                    icon: icon
                },
            }
        );
        return res.status(201).send({ message: 'Category updated successfully' })

    } catch (error) {
        console.log('Error while update Category');
        res.send({ error: "Error While updating Category" });
        throw (error)
    }
}