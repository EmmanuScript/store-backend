import { PoolClient, QueryResult } from 'pg';
import Client from '../database';

export type Products = {
    id?: number;
    name: string;
    price: string;
    category: string;
}

export class ProductStore {
  // define table
  table: string = 'products';

  // select all products
  async getProducts(): Promise<Products[]> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql: string = `SELECT * FROM ${this.table}`;
      const result: QueryResult = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get all products. Error: ${(err)}`);
    }
  }

  // select product by id
  async getProductById(productId: number): Promise<Products> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql: string = `SELECT * FROM ${this.table} WHERE id=$1`;
      const result: QueryResult = await conn.query(sql, [productId]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get product by id. Error: ${(err)}`);
    }
  }

  // select product by category
  async getProdCategory(category: string): Promise<Products[][]> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql: string = `SELECT * FROM ${this.table} WHERE category=$1`;
      const result: QueryResult = await conn.query(sql, [category]);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not get product by category. Error: ${(err)}`
      );
    }
  }

  // create product
  async createProduct(product: Products): Promise<Products> {
    try {
      const { name, price, category } = product;
      const sql: string = `INSERT INTO ${this.table} (name, price, category) VALUES($1, $2, $3) RETURNING *`;
      const conn: PoolClient = await Client.connect();
      const result: QueryResult = await conn.query(sql, [
        name,
        price,
        category
      ]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create product. Error: ${(err)}`);
    }
  }

  // delete product
  async deleteProduct(id: number): Promise<Products[]> {
    try {
      const sql: string = `DELETE FROM ${this.table} WHERE id=$1 RETURNING *`;
      const conn: PoolClient = await Client.connect();
      const result: QueryResult = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not delete product ${id}. Error: ${(err)}`
      );
    }
  }
}
