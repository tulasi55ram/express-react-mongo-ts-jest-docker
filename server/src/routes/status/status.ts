import { Router, Request, Response, NextFunction } from "express";

const router: Router = Router();

router.get("/status", async (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).send("Ok");
});

export default router;
