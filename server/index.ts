import express from "express";
import { registerRoutes } from "./routes.js";
import { setupVite, serveStatic, log } from "./vite.js";

async function startServer() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use((req, res, next) => {
    const start = Date.now();
    const originalSend = res.send;
    res.send = function (...args) {
      const duration = Date.now() - start;
      
      log(
        `${req.method} ${req.url} ${res.statusCode} in ${duration}ms :: ${JSON.stringify(args[0]).slice(0, 100)}${JSON.stringify(args[0]).length > 100 ? '…' : ''}`,
        "express"
      );
      
      return originalSend.apply(this, args);
    };
    next();
  });

  const server = await registerRoutes(app);

  // Important: this must come last so the frontend takes precedence over the API
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    await setupVite(app, server);
  }

  // Error handling
  app.use((err: any, _req: any, res: any, _next: any) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    log(`Error ${status}: ${message}`, "express");
    res.status(status).json({ 
      message: message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    });
  });

  const PORT = parseInt(process.env.PORT || "5000");
  server.listen(PORT, "0.0.0.0", () => {
    log(`serving on port ${PORT}`);
  });
}

startServer().catch(console.error);