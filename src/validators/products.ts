import { Request, Response, NextFunction } from 'express'
import { check } from 'express-validator'
import { validateResult } from '../helpers/validateHelper'


export const validateIdProduct = [
  check('id').exists().isNumeric(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next)
  }
]

export const validateCreateProduct = [
  check('name').exists().not().isEmpty(),
  check("price").exists().isNumeric(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next)
  }]

export const validateUpdateProduct = [
  check("name").isString().optional(),
  check("price").isNumeric().optional(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next)
  }
]
