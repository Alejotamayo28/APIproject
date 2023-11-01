import { Request, Response } from 'express'
import { Query, QueryResult } from 'pg'
import { pool } from '../database'

export const getAllproducts = async (res: Response) => {
  const response: QueryResult = await pool.query('SELECT * FROM Products')
  return res.status(200).json(response.rows)
}

export const getProductById = async (id: any) => {
  const response: QueryResult = await pool.query('SELECT * FROM products WHERE id = $1', [id])
  return response
}

export const idNotFound = async (res: Response) => {
  return res.status(404).json({ message: "id NOT FOUND" })
}

export async function updateProduct(id: any, name: string, price: any) {
  const userId = await getProductById(id)
  const userData = userId.rows[0]

  const updateProductData = {
    name: name || userData.name,
    price: price || userData.price
  }
  await pool.query('UPDATE products SET name = $1, price = $2 WHERE id = $3', [updateProductData.name, updateProductData.price, id])
}

export async function returningProductData(res: Response, id: any, name: string, price: number) {
  return res.status(202).json({
    message: 'Product Succesfully Updated',
    body: {
      name,
      price
    }
  })
}

export async function createProductFunction(name: string, price: number) {
  await pool.query('INSERT INTO products (name,price) VALUES ($1,$2)', [name, price])
}



