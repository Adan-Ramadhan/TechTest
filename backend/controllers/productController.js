import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProduct = async (req, reply) => {
  try {
    const products = await prisma.product.findMany();

    reply.send(products);
  } catch (err) {
    console.error(err);
  }
};

export const addProduct = async (req, reply) => {
  try {
    const { name, price, image, categoryId } = req.body;
    const existCategory = await prisma.category.findUnique({where : {id: categoryId}})
    const existProduct = await prisma.product.findUnique({ where: {name} });

    if(!existCategory){
        return reply.status(400).send({error : "Category tidak ditemukan"})
    }
    
    if (existProduct) {
      return reply.status(400).send({ error: "Name product sudah ada" });
    }

    const product = await prisma.product.create({
      data: { name, price, image, categoryId },
    });

    reply.send(product);
  } catch (err) {
    console.error(err);
    reply.status(400).send({ error: "product gagal di upload" });
  }
};
