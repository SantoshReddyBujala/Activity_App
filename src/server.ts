import cors from "cors";
import express, { Request, Response } from "express";
import connectDB from "./dbconfig";
import categoryRoutes from "./routes/category.routes";
import taskRoutes from "./routes/task.routes";
import userRoutes from "./routes/user.routes";

const application = express();

application.use(express.json());

application.use(cors())

const PORT = 3600;

connectDB();

application.get('/ping', (req: Request, res: Response) => {
    res.send("Test");
});

application.use("/user", userRoutes);
application.use("/categories", categoryRoutes);
application.use("/tasks", taskRoutes);

application.listen(PORT, () => {
    console.log('Server up and running');
})
