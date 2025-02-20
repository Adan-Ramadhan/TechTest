import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addCategory = async (req, reply) => {
  try {
    const { name } = req.body;

    const existCategory = await prisma.category.findUnique({ where: { name } });
    if (existCategory) {
      return reply.status(400).send({ error: "Name category sudah ada" });
    }

    const category = await prisma.category.create({ data: { name } });

    reply.send(category);
  } catch (err) {
    console.log(err);
    reply.status(400).send({ error: "Category gagal diupload" });
  }
};

export const getCategory = async (req, reply) => {
  try {
    const categories = await prisma.category.findMany();

    reply.send(categories);
  } catch (err) {
    console.error(err);
    reply.status(400).send({ error: "Gagal ambil category" });
  }
};

export const deleteCategory = async (req, reply) => {
  try {
    const { id } = req.params;
    const existCategory = await prisma.category.findUnique({
      where: { id: Number(id) },
    });

    if (!existCategory) {
      return reply.status(404).send({ error: "Category tidak ditemukan" });
    }

    await prisma.category.delete({
      where: { id: Number(id) },
    });

    reply.send({ message: "Category berhasil dihapus" });
  } catch (err) {
    console.error(err);
    reply.status(400).send({ error: "Gagal delete category" });
  }
};
