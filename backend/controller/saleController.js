import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const discountVsQuantity = async (_req, res) => {
  try {
    const raw = await prisma.sale.findMany({
      select: { state: true, quantity: true, discount: true },
    });

    const grouped = [];

    raw.forEach(({ state, quantity, discount }) => {
      let bucket = grouped.find(g => g.state === state);
      if (!bucket) {
        bucket = { state, values: [] };
        grouped.push(bucket);
      }

      const existing = bucket.values.find(
        v => v.quantity === quantity && v.discount === discount
      );

      if (existing) {
        existing.count += 1;
      } else {
        bucket.values.push({ quantity, discount, count: 1 });
      }
    });

    res.json(grouped);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const quantityByStateAndProduct = async (_req, res) => {
 try {
    const salesByCountry = await prisma.sale.groupBy({
      by: ['state', 'productId'],
      _sum: {
        quantity: true,
      },
    });

    const heatmapData = await Promise.all(
      salesByCountry.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
          select: { name: true },
        });
        return {
          state: item.state,
          product: product?.name || 'Unknown Product',
          quantity: item._sum.quantity || 0,
        };
      })
    );

    res.json(heatmapData);
  } catch (error) {
    console.error('Error fetching country heatmap data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const saleController = {
  discountVsQuantity,
  quantityByStateAndProduct,
};
