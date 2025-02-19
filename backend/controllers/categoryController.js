import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addCategory = async (req, reply) => {
  try {
    const { name } = req.body;
    const category = await prisma.category.create({ data: { name } });

    reply.send(category);
  } catch (err) {
    console.log(err);
    reply.status(400).send({ error: "Produk gagal diupload" });
  }
};

export const getCategory = async (req, reply) => {
  try {
    const categories = await prisma.category.findMany();

    reply.send(categories);
  } catch (err) {
    console.error(err);
  }
};
