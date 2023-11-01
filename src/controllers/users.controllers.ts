import { NextFunction, Request, Response } from 'express'
import { pool } from '../database'
import { fFidUserNotFound, fGetAllUsers, fGetUserById, fUpdateUsersFunction, fReturningUserData, createUserFunction, deleteUserFunction } from '../Functions/userFunction'


export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return fGetAllUsers(res)
  } catch (e) {
    return res.json(next(e))
  }
}

export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const { id } = req.params
    const response = await fGetUserById(id)
    return response.rowCount === 0 ? res.status(404).json({ message: 'NOT FaOUND' }) : res.status(302).json(response.rows)
  } catch (e) {
    return res.json(next(e))
  }
}

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const { name, email, age } = req.body
    await createUserFunction(name, email, age)
    return res.json({
      message: 'User Created Succesfully',
      body: {
        name,
        email,
        age
      }
    }), res.status(201)
  } catch (e) {
    return res.json(next(e))
  }
}

export const updateUsers = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const { id } = req.params
    const { name, email, age } = req.body
    const response = await fGetUserById(id)
    if (response.rowCount == 0) {
      return fFidUserNotFound(res)
    } else {
      fUpdateUsersFunction(id, name, email, age)
      return fReturningUserData(res, id, name, email, age)
    }
  }
  catch (e) {
    return res.json(next(e))
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const { id } = req.params
    return deleteUserFunction(res, id)
  } catch (e) {
    return res.json(next(e))
  }
}
























