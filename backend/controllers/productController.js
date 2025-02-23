import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProduct = async (req, reply) => {
  try {
    const products = await prisma.product.findMany({
      include: { categories: true },
    });

    reply.send(products);
  } catch (err) {
    console.error(err);
    reply.status(400).send({ error: "product gagal di ambil" });
  }
};

export const addProduct = async (req, reply) => {
  try {
    const { name, price, image, categoryIds } = req.body;

    const formattedPrice = parseFloat(price);
    const formattedCategoryId = parseInt(categoryIds);
    const existProduct = await prisma.product.findUnique({ where: { name } });
    const existCategory = await prisma.category.findUnique({
      where: { id: formattedCategoryId },
    });

    if (!existCategory) {
      return reply.status(404).send({ error: "Category tidak ditemukan" });
    }

    if (existProduct) {
      return reply.status(400).send({ error: "Name product sudah ada" });
    }

    const product = await prisma.product.create({
      data: {
        name,
        price: formattedPrice,
        image,
        categoryIds: categoryIds.map((id) => ({ id })),
      },
    });

    reply.send(product);
  } catch (err) {
    console.error(err);
    reply.status(400).send({ error: "product gagal di upload" });
  }
};

export const deleteProduct = async (req, reply) => {
  try {
    const { id } = req.params;

    const existProduct = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!existProduct) {
      return reply.status(404).send({ error: "Product tidak ditemukan" });
    }

    await prisma.product.delete({
      where: { id: Number(id) },
    });
    reply.send({ message: "Product berhasil dihapus" });
  } catch (err) {
    console.error(err);
    reply.status(400).send({ error: "product gagal di upload" });
  }
};

export const updateProduct = async (req, reply) => {
  try {
    const { id } = req.params;
    const { name, price, image, categoryIds } = req.body;

    const formattedPrice = parseFloat(price);
    const existProduct = await prisma.product.findUnique({
      where: { id: Number(id) },
    });
    const existCategory = await prisma.category.findUnique({
      where: { id: Number(categoryIds) },
    });

    if (!existProduct) {
      return reply.status(404).send({ error: "Product tidak ditemukan" });
    }

    if (!existCategory) {
      return reply.status(400).send({ error: "Category tidak ditemukan" });
    }
    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name,
        price: formattedPrice,
        image,
        categories: {
          set: categoryIds.map((id) => {
            id;
          }),
        },
      },
    });
    reply.send(updatedProduct);
  } catch (err) {
    console.error(err);
    reply.status(500).send({ error: "Gagal mengupdate product" });
  }
};
