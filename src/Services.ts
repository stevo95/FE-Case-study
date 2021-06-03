import db from './assets/products.json';
import { Planet } from './Interfaces/planet.interface'

function getProducts(): Planet[] {
  let products = [];
  for (const product of db) {
    products.push(product);
  }
  return products;
}

function getProductById(id: number): Planet | undefined {
  for (const product of db) {
    if (id === product.id) return product;
  }
}

export { getProducts, getProductById };