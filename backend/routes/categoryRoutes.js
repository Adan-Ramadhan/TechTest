import { addCategory, getCategory } from "../controllers/categoryController.js";

async function categoryRoutes(fastify) {
    fastify.post("/add-category", addCategory)
    fastify.get("/category", getCategory)
}

export default categoryRoutes;