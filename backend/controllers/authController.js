import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const login = async (req, reply, fastify) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return reply.status(401).send({ error: "Email atau password salah" });
    }

    const token = fastify.jwt.sign({ id: user.id, email: user.email });

    reply.send({ token });
  } catch (err) {
    console.error(err);
  }
};

export const register = async (req, reply, fastify) => {
  const { email, password } = req.body; 
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });
    reply.send(user);
  } catch (error) {
    console.error("Error saat registrasi:", error);
    if (error.code === "P2002") {
      reply.status(400).send({ error: "Email sudah digunakan" });
    }
    reply.status(500).send({ error: "Terjadi kesalaham pada server" });
  }
};
