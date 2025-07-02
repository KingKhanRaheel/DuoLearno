import express from "express";
import { registerRoutes } from "./routes.js";
import { setupVite, serveStatic, log } from "./vite.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const originalSend = res.send;
  res.send = function (...args) {
    const duration = Date.now() - start;
    const logData = {
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: `${duration}ms`,
      body: args[0]
    };
    
    log(
      `${req.method} ${req.url} ${res.statusCode} in ${duration}ms :: ${JSON.stringify(args[0]).slice(0, 100)}${JSON.stringify(args[0]).length > 100 ? '…' : ''}`,
      "express"
    );
    
    originalSend.apply(this, args);
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

const PORT = process.env.PORT || 5000;
server.listen(PORT, "0.0.0.0", () => {
  log(`serving on port ${PORT}`);
});

// Error handling
app.use((err, _req, res, _next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  log(`Error ${status}: ${message}`, "express");
  res.status(status).json({ 
    message: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
});