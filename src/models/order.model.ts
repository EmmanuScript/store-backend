import Client from '../database';

export type Order = {
    id?: number;
    products_id: number;
    quantity: number;
    user_id: number;
    status: string;

}

export class OrderStore {
  // define table
  table: string = 'orders';

  //select all orders
  async getAllOrders(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM ${this.table}`;
      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not get all orders of user. Error: ${err}}`
      );
    }
  }

  // select all orders for a user
  async getOrders(userId: number): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM ${this.table} WHERE user_id=$1`;
      const result = await conn.query(sql, [userId]);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not get all orders of user. Error: ${err}}`
      );
    }
  }

  // Get current order by user id
  async getCurrentOrderByUserId(userId: number): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM ${this.table} WHERE user_id = ${userId} ORDER BY id DESC LIMIT 1`;
      const result = await conn.query(sql);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get current order. Error: ${(err)}`);
    }
  }

 


  // create an order
  async createOrder(order: Order): Promise<Order> {
    try {
      const { products_id, quantity, user_id, status } = order;

      const conn = await Client.connect();
      const sql = `INSERT INTO ${this.table} (products_id, quantity, user_id, status) VALUES($1, $2, $3, $4) RETURNING *`;
      const result = await conn.query(sql, [
        products_id,
        quantity,
        user_id,
        status
      ]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create order. Error: ${(err)}`);
    }
  }

  // update an order
  async updateOrderStatus(
    status: string,
    orderId: number
  ): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = `UPDATE ${this.table} SET status=$1 WHERE id=$2 RETURNING *`;
      const result = await conn.query(sql, [status, orderId]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not update order status. Error: ${(err)}`
      );
    }
  }

  async deleteOrder(id: number): Promise<Order[]> {
    try {
      const sql = `DELETE FROM ${this.table} WHERE id=$1 RETURNING *`;
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not delete order ${id}. Error: ${(err)}`
      );
    }
  }
}
