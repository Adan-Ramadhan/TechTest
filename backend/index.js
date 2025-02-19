import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import formbody from "@fastify/formbody";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const fastify = Fastify({
  logger: true,
});
const prisma = new PrismaClient();

fastify.register(cors);
fastify.register(formbody);
fastify.register(jwt, { secret: "supersecret" });

fastify.get("/", async (req, reply) => {
  reply.send({ messgae: "Hello this server is running" });
});

fastify.post("/register", async (req, reply) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });
    reply.send(user);
  } catch (error) {
    if (error.code === "P2002") {
      reply.status(400).send({ error: "Email sudah digunakan" });
    }
    reply.status(500).send({ error: "Terjadi kesalaham pada server" });
  }
});

fastify.post("/login", async (req, reply) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return reply.status(401).send({ error: "Email atau password salah" });
  }

  const token = fastify.jwt.sign({ id: user.id, email: user.email });

  reply.send({ token });
});

fastify.post("/add-product", async (req, reply) => {
  const { name, price, image } = req.body;

  const existProduct = await prisma.product.findUnique({where : {name}})

  try {

    if(existProduct){
      return reply.status(404).send({error: "Name product sudah digunakan"})
    }

    const product = await prisma.product.create({
      data: {
        name,
        price,
        image,
      },
    });
    reply.send(product);
  } catch (error) {
    console.error(error);
    reply.status(400).send({ error: "product gagal di upload" });
  }
});

fastify.get("/product", async (req, reply) => {
  const products = await prisma.product.findMany();

  reply.send({ products });
});

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server is now listening on ${address}`);
});
