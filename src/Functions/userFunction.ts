import { Response } from 'express'
import { QueryResult } from 'pg'
import { pool } from '../database'

export const fGetAllUsers = async (res: Response) => {
  const response: QueryResult = await pool.query('SELECT * FROM users')
  return res.status(200).json(response.rows)
}

export const fGetUserById = async (id: any) => {
  const response: QueryResult = await pool.query('SELECT * FROM users WHERE id = $1', [id])
  return response
}

export const fFidUserNotFound = async (res: Response) => {
  return res.status(404).json({ message: "id NOT FOUND" })
}

export async function fUpdateUsersFunction(id: any, name: string, email: string, age: number) {
  const userId = await fGetUserById(id)
  const userData = userId.rows[0]
  const updateUserData = {
    name: name || userData.name,
    email: email || userData.email,
    age: age || userData.age
  }
  await pool.query('UPDATE users SET name = $1, email = $2, age=$3 WHERE id = $4', [updateUserData.name, updateUserData.email, updateUserData.age, id])
}

export async function fReturningUserData(res: Response, id: any, name: string, email: any, age: number) {
  return res.status(202).json({
    message: 'Product Succesfully Updated',
    body: {
      name,
      email,
      age,
    }
  })
}

export async function createUserFunction(name: string, email: number, age: any) {
  await pool.query('INSERT INTO users (name,email,age) VALUES ($1,$2,$3)', [name, email, age])
}

export async function deleteUserFunction(res: Response, id: string) {
  await pool.query('DELETE FROM users WHERE id = $1', [id]);
  return res.json({ message: `User deleted Succefully` })
}
