import express from "express"
import { authenticationMiddleware } from "../middleware";
import { createTask, deleteTask, editTask, getAllCompletedTasks, getAllTasks, getAllTasksByCategory, getTodayTasks, toggleTaskStatus } from "../controllers/task.controller";

const taskRoutes = express.Router();
taskRoutes.use(authenticationMiddleware);
taskRoutes.route("/").get(getAllTasks);
taskRoutes.route("/completed").get(getAllCompletedTasks);
taskRoutes.route("/today").get(getTodayTasks);
taskRoutes.route("/tasks-by-categories/:id").get(getAllTasksByCategory);
taskRoutes.route("/create").post(createTask);
taskRoutes.route("/task/:id").delete(deleteTask);
taskRoutes.route("/update/:id").put(toggleTaskStatus);
taskRoutes.route("/edit/:id").put(editTask);

export default taskRoutes;