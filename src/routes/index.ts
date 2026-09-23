import { Router, Response } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

// Health check endpoint (used by Render and the CI pipeline)
router.get('/health/db', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: 'ok', database: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'error', database: 'disconnected' });
  }
});

// Future feature routes will be added here:
// router.use('/auth', require('../features/auth/auth.routes'));
// router.use('/products', require('../features/product/product.routes'));

export default router;