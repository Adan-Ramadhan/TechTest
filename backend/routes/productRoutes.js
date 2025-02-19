import { addProduct, getProduct } from "../controllers/productController.js";

async function productRoutes(fastify) {
    fastify.get("/product", getProduct)
    fastify.post("/add-product", addProduct)
}

export default productRoutes;