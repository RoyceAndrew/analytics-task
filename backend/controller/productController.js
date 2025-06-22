import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getMostSoldProducts = async (_req, res) => {
  try {
    const result = await prisma.sale.groupBy({
      by: ['productId'],
      _sum: {
        quantity: true,
      },
      orderBy: {
        _sum: {
          quantity: 'desc',
        },
      },
    });

    const products = await Promise.all(
      result.map(async (row) => {
        const product = await prisma.product.findUnique({
          where: { id: row.productId },
        });

        return {
          productId: row.productId,
          name: product?.name || "Unknown",
          totalSold: row._sum.quantity,
        };
      })
    );

    res.json(products);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const productController = {
  getMostSoldProducts,
};