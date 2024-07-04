"use server"

import fs from 'fs';
import path from 'path';
import { ProductJSON } from '@/types';

export async function readJsonFile(fileName: string) {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', fileName);
    const data = await fs.promises.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${fileName} file: ${fileName}`, error);
    throw new Error(`Failed to read ${fileName} file`);
  }
}

export async function readProductsFromJson(fileName: string) {
  const data: ProductJSON[] = await readJsonFile(fileName);
  return data.map(
    (row) => ({
      title: row.title,
      price: row.price || 'Not Mentioned',
      reviews: parseInt(row.reviews || '0'),
      imageUrl: row.image_url,
      scrapeDatetime: new Date(row.scrape_datetime)
    })
  )
}