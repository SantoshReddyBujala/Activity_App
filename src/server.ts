import { Request, Response } from "express";
import connectDB from "./dbconfig";

import express from "express";
import userRoutes from "./routes/user.routes";
import categoryRoutes from "./routes/category.routes";
const application = express();

application.use(express.json());

const PORT = 3600;

connectDB();

application.get('/ping', (req: Request, res: Response) => {
    res.send("Test");
});

application.use("/user", userRoutes);
application.use("/categories", categoryRoutes);

application.listen(PORT, () => {
    console.log('Server up and running');
})
