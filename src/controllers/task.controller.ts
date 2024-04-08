import { Response } from "express";
import { AuthRequest } from "../middleware";
import Task from "../models/task-model";
import { ITask } from "../types";

export const getAllTasks = async (req: AuthRequest, res: Response) => {
    try {
        const { userId } = req;
        const tasks = await Task.find({ user: userId }).exec();
        return res.send(tasks);
    } catch (error) {
        console.log('Error in Get Tasks', error);
    }
}

export const getAllTasksByCategory = async (req: AuthRequest, res: Response) => {
    try {
        const { userId } = req;
        const { id } = req.params;

        const tasks = await Task.find({ user: userId, categoryId: id }).exec();
        return res.send(tasks);
    } catch (error) {
        console.log('Error in getAllTasksByCategory', error);
    }
}

export const getAllCompletedTasks = async (req: AuthRequest, res: Response) => {
    try {
        const { userId } = req;
        const tasks = await Task.find({ user: userId, isCompleted: true }).exec();
        return res.send(tasks);
    } catch (error) {
        console.log('Error in getAllCompletedTasks', error);
    }
}

export const getTodayTasks = async (req: AuthRequest, res: Response) => {
    try {
        const { userId } = req;
        const todayISODate = new Date();
        todayISODate.setHours(0, 0, 0, 0);
        const tasks = await Task.find({ user: userId, date: todayISODate.toISOString() }).exec();
        return res.send(tasks);
    } catch (error) {
        console.log('Error in getTodayTasks', error);
    }
}

export const createTask = async (req: AuthRequest, res: Response) => {
    try {
        const { name, isCompleted, date, categoryId, isEditable }: ITask = req.body;

        const { userId } = req;

        const category = await Task.create({
            name: name,
            user: userId,
            //isCompleted: isCompleted,
            date: date,
            //isEditable: isEditable,
            categoryId: categoryId
        });
        return res.status(201).send({ message: 'Task created successfully' })

    } catch (error) {
        console.log('Error while create Task');
        res.send({ error: "Error While create Task" });
        throw (error)
    }
}

export const toggleTaskStatus = async (req: AuthRequest, res: Response) => {
    try {
        const { isCompleted } = req.body;
        const { id } = req.params;
        const task = await Task.updateOne(
            {
                _id: id
            },
            {
                $set:
                {
                    isCompleted: isCompleted
                }
            }
        );
        res.send({ message: "Task Toggled" });
    } catch (error) {
        console.log('Error occurs while toggle task');
        res.send({ error: "Toggle task" });
    }
}

export const deleteTask = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        await Task.deleteOne({ _id: id });
        res.send({ message: "Category Deleted" });
    } catch (error) {
        console.log('Error occurs while delete category');
        res.send({ error: "Category Deleted" });
    }
}

export const editTask = async (req: AuthRequest, res: Response) => {
    try {
        const { _id, name, isCompleted, date, categoryId }: ITask = req.body;

        if (!_id) {
            return res.status(400).json({ message: "ID parameter required." });
        }

        const findCategory = await Task.findOne({ _id }).exec();
        if (!findCategory) {
            return res
                .status(204)
                .json({ message: `No category Matches ${_id} not found` });
        }

        const category = await Task.updateOne(
            { _id: _id },
            {
                $set:
                {
                    name: name,
                    date: date,
                    categoryId: categoryId
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
