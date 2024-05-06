import express from "express"
import { createCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "../controllers/category.controller";
import { authenticationMiddleware } from "../middleware";

const categoryRoutes = express.Router();
categoryRoutes.use(authenticationMiddleware);
categoryRoutes.route("/").get(getAllCategories);
categoryRoutes.route("/create").post(createCategory);
categoryRoutes.route("/category/:id").delete(deleteCategory);
categoryRoutes.route("/update").put(updateCategory);
categoryRoutes.route("/:id").get(getCategory);

export default categoryRoutes;

