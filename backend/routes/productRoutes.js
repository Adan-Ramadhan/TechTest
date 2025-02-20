import { addProduct, deleteProduct, getProduct, updateProduct } from "../controllers/productController.js";

async function productRoutes(fastify) {
    fastify.get("/product", getProduct)
    fastify.post("/add-product", addProduct)
    fastify.put("/product/:id", updateProduct)
    fastify.delete("/product/:id", deleteProduct)
}

export default productRoutes;