import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { config } from "./config";
import apiRouter from "./routes";
import { errorHandler } from "./middleware/errorHandler";
import { notFound } from "./middleware/notFound";

const app: Application = express();

// --- Security Middleware (Essential Stack) ---
app.use(helmet()); // Sets security headers

// CORS: Strictly allow your future Vercel frontend
app.use(
  cors({
    origin: config.clientUrl,
    credentials: true,
  }),
);

// Global rate limiting (100 requests per minute per IP)
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100,
  message: "Too many requests from this IP, please try again after a minute.",
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", limiter);

// Body parsing with a size limit to prevent DoS
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// --- Routes ---
app.use("/api", apiRouter);

// --- Error Handling (must be last) ---
app.use(notFound);
app.use(errorHandler);

export default app;
