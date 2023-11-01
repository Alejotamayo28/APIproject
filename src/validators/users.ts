import { Request, Response, NextFunction } from 'express'
import { check } from 'express-validator'
import { validateResult } from '../helpers/validateHelper'



export const validateIdUser = [
  check('id').exists().isNumeric(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next)
  }
]

export const validateCreateUser = [
  check('name').exists().not().isEmpty(),
  check('email').exists().isEmail(),
  check('age').exists().isNumeric().custom((value, { req }) => { // 'value' = > valor de 'age' // return true (paso), return false(no paso)
    if (value < 18 || value > 100) { throw new Error('age out of range (18/100)') }
    return true
  }),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next)
  }
]

export const validateUpdateUser = [
  check("name").isString().optional(),
  check("email").isEmail().optional(),
  check("age").isNumeric().custom((value, { req }) => {
    if (value < 18 || value > 100) { throw new Error('age out of range (18/100)') }
    return true
  }),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next)
  }
]
