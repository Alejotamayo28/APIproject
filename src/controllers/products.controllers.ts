import { Request, Response, NextFunction } from 'express'
import { pool } from '../database'
import { getAllproducts, getProductById, idNotFound, returningProductData, updateProduct, createProductFunction } from '../Functions/productFunctions'
// usar next(e) (try,catch(e)) ==> pero no se como implementarlo bien xdd

export const getProducts = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    return getAllproducts(res)
  } catch (e) {
    return res.json(next(e))
  }
}

export const getProductsbyId = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const { id } = req.params
    const response = await getProductById(id)
    return response.rowCount === 0 ? res.status(404).json({ message: 'NOT FOUND' }) : res.status(302).json(response.rows)
  } catch (e) {
    return res.json(next(e))
  }
}


export const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const { name, price } = req.body
    await createProductFunction(name, price)
    return res.json({
      message: 'Product Created Succesfully',
      body: {
        name,
        price,
      }
    }), res.status(201)
  } catch (e) {
    return res.json(next(e))
  }
}

export const updateProducts = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const { id } = req.params
    const { name, price } = req.body
    const response = await getProductById(id)
    if (response.rowCount == 0) {
      return idNotFound(res)
    } else {
      updateProduct(id, name, price)
      return returningProductData(res, id, name, price)
    }
  }
  catch (e) {
    return res.json(next(e))
  }

}

export const deleteProducts = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const { id } = req.params
    await pool.query('DELETE FROM products WHERE id = $1', [id])
    return res.status(202).json('User Succesfully Deleted')
  } catch (e) {
    return res.json(next(e))
  }
}

