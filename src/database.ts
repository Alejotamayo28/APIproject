import { Pool } from 'pg' // serie de conexiones para poder usar en mi codigo de NODE
export const pool = new Pool({ // instancia la clase 'Pool'
  user: 'postgres',
  host: 'localhost',
  password: 'password',
  database: 'projectusers',
  port: 5432
})

export const dbConfig = {
  user: 'postgres',
  host: 'localhost',
  password: 'password',
  database: 'projectusers',
  port: 5432
}
