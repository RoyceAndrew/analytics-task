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
  await client.query('BEGIN');
  
  try {
    const workbook = XLSX.readFile('./data/kaggle_supermarket_dataset.xlsx');
    const sheet = workbook.Sheets['Tableau Superstore'];
    const data = XLSX.utils.sheet_to_json(sheet);

    const categories = new Set();
    const subcategories = new Set();
    const products = new Set();
    const subcatToCat = new Map();
    const prodToSubcat = new Map();

    for (const row of data) {
      const cat = row['Category'];
      const subcat = row['Sub-Category'];
      const prod = row['Product Name'];
      
      categories.add(cat);
      subcategories.add(subcat);
      products.add(prod);
      subcatToCat.set(subcat, cat);
      prodToSubcat.set(prod, subcat);
    }
    const existingCategoriesResult = await client.query(`SELECT name FROM "Category"`);
    const existingCategories = new Set(existingCategoriesResult.rows.map(r => r.name));
    const newCategories = Array.from(categories).filter(cat => !existingCategories.has(cat));
    
    if (newCategories.length > 0) {
      const categoryValues = newCategories.map((_, i) => `($${i + 1})`).join(',');
      await client.query(
        `INSERT INTO "Category"(name) VALUES ${categoryValues}`,
        newCategories
      );
    }

    const categoryRows = await client.query(`SELECT id, name FROM "Category"`);
    const categoryMap = new Map(categoryRows.rows.map(r => [r.name, r.id]));
    const existingSubcategoriesResult = await client.query(`SELECT name FROM "Subcategory"`);
    const existingSubcategories = new Set(existingSubcategoriesResult.rows.map(r => r.name));
    
    const newSubcategoriesData = Array.from(subcategories)
      .filter(subcat => !existingSubcategories.has(subcat))
      .map(name => [name, categoryMap.get(subcatToCat.get(name))]);
    
    if (newSubcategoriesData.length > 0) {
      const subcategoryValues = newSubcategoriesData.map((_, i) => `($${i * 2 + 1}, $${i * 2 + 2})`).join(',');
      const subcategoryParams = newSubcategoriesData.flat();
      
      await client.query(
        `INSERT INTO "Subcategory"(name, "categoryId") VALUES ${subcategoryValues}`,
        subcategoryParams
      );
    }

    const subcategoryRows = await client.query(`SELECT id, name FROM "Subcategory"`);
    const subcategoryMap = new Map(subcategoryRows.rows.map(r => [r.name, r.id]));

    const existingProductsResult = await client.query(`SELECT name FROM "Product"`);
    const existingProducts = new Set(existingProductsResult.rows.map(r => r.name));
    
    const newProductsData = Array.from(products)
      .filter(prod => !existingProducts.has(prod))
      .map(name => [name, subcategoryMap.get(prodToSubcat.get(name))]);
    
    if (newProductsData.length > 0) {
      const productValues = newProductsData.map((_, i) => `($${i * 2 + 1}, $${i * 2 + 2})`).join(',');
      const productParams = newProductsData.flat();
      
      await client.query(
        `INSERT INTO "Product"(name, "subcategoryId") VALUES ${productValues}`,
        productParams
      );
    }

    const productRows = await client.query(`SELECT id, name FROM "Product"`);
    const productMap = new Map(productRows.rows.map(r => [r.name, r.id]));
    const BATCH_SIZE = 1000;
    const salesData = data.map(row => [
      productMap.get(row['Product Name']),
      parseInt(row['Quantity']) || 0,
      parseFloat(row['Discount']) || 0,
      row['Country'] || '',
      row['State'] || '',
      new Date(row['Order Date'])
    ]);

    for (let i = 0; i < salesData.length; i += BATCH_SIZE) {
      const batch = salesData.slice(i, i + BATCH_SIZE);
      const values = batch.map((_, idx) => 
        `($${idx * 6 + 1}, $${idx * 6 + 2}, $${idx * 6 + 3}, $${idx * 6 + 4}, $${idx * 6 + 5}, $${idx * 6 + 6})`
      ).join(',');
      
      const params = batch.flat();
      
      await client.query(
        `INSERT INTO "Sale"("productId", quantity, discount, country, state, date) VALUES ${values}`,
        params
      );
      
      const batchNumber = Math.floor(i / BATCH_SIZE) + 1;
      const totalBatches = Math.ceil(salesData.length / BATCH_SIZE);
      console.log(`Inserted sales batch ${batchNumber}/${totalBatches} (${batch.length} records)`);
    }

    
    await client.query('COMMIT');
    console.log('Data inserted successfully!');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error inserting data:', error);
    throw error;
  } finally {
    await client.end();
  }
})();