import { login, register } from "../controllers/authController.js";

async function authRoutes(fastify) {
    fastify.post("/login", (req, reply) => login(req, reply, fastify));
    fastify.post("/register", (req, reply) => register(req, reply, fastify));

}

export default authRoutes;