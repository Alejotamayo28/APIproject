import { Response, Request, NextFunction } from 'express'

export function logError(err: Error, req: Request, res: Response, next: NextFunction): void {
  // imprime el error en la consola
  console.log(err)
  next(err)
}

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  // envia el error, acaba con la peticion y lo envia en tipo JSON
  res.status(500).json({
    message: err.message,
    stack: err.stack
  })
}

export function boomErrorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  res.status(500).json({
    message: err.message,
    stack: err.stack
  })
}

