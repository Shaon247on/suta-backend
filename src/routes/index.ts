import { Router, Response } from "express";

const router = Router();

// Health check endpoint (used by Render and the CI pipeline)
router.get("/health", (_, res: Response) => {
  res.status(200).json({
    status: "ok",
    message: "Suta backend is healthy",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Future feature routes will be added here:
// router.use('/auth', require('../features/auth/auth.routes'));
// router.use('/products', require('../features/product/product.routes'));

export default router;