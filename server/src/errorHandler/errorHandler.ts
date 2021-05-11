import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

export const errorHandler = (err: Error, _req: Request, res: Response, next: NextFunction): void => {
  const { message } = err;

  res.status(501).json({
    message,
    errorId: uuidv4(),
  });
};
