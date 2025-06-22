import { readFile } from 'fs/promises';
import XLSX from 'xlsx';
import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

(async () => {
  await client.connect();

  const workbook = XLSX.readFile('./data/kaggle_supermarket_dataset.xlsx');
  const sheet = workbook.Sheets['Tableau Superstore'];
  const data = XLSX.utils.sheet_to_json(sheet);

  const categoryMap = new Map();
  const subcategoryMap = new Map();
  const productMap = new Map();

  for (const row of data) {
    const category = row['Category'];
    const subcategory = row['Sub-Category'];
    const product = row['Product Name'];

    if (!categoryMap.has(category)) {
      const res = await client.query(
        `INSERT INTO "Category"(name) VALUES ($1) RETURNING id`,
        [category]
      );
      categoryMap.set(category, res.rows[0].id);
    }

    if (!subcategoryMap.has(subcategory)) {
      const catId = categoryMap.get(category);
      const res = await client.query(
        `INSERT INTO "Subcategory"(name, "categoryId") VALUES ($1, $2) RETURNING id`,
        [subcategory, catId]
      );
      subcategoryMap.set(subcategory, res.rows[0].id);
    }

    if (!productMap.has(product)) {
      const subcatId = subcategoryMap.get(subcategory);
      const res = await client.query(
        `INSERT INTO "Product"(name, "subcategoryId") VALUES ($1, $2) RETURNING id`,
        [product, subcatId]
      );
      productMap.set(product, res.rows[0].id);
    }

    const productId = productMap.get(product);
    const quantity = parseInt(row['Quantity']);
    const discount = parseFloat(row['Discount']);
    const country = row['Country'];
    const state = row['State'];
    const date = new Date(row['Order Date']);

    await client.query(
      `INSERT INTO "Sale"("productId", quantity, discount, country, state, date) VALUES ($1, $2, $3, $4, $5, $6)`,
      [productId, quantity, discount, country, state, date]
    );
  }

  await client.end();
  console.log('Data inserted successfully!');
})();