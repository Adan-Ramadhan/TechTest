import Fastify from "fastify";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import jwt from "@fastify/jwt";
import cors from "@fastify/cors";
import formbody from "@fastify/formbody";

const fastify = Fastify({
  logger: true,
});
fastify.register(jwt, { secret: "supersecret" });
fastify.register(cors)
fastify.register(formbody)


fastify.register(categoryRoutes);
fastify.register(productRoutes);
fastify.register(authRoutes);

fastify.get("/", async (req, reply) => {
  reply.send({ messgae: "Hello this server is running" });
});

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server is now listening on ${address}`);
});
