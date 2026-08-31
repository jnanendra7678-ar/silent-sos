import app from "./app.js";
import { env } from "./config/env.js";
import { connectDatabase } from "./config/database.js";

async function startServer() {
  try {
    await connectDatabase();

    const port = Number(process.env.PORT ?? env.PORT);

    app.listen(port, "0.0.0.0", () => {
      console.log(`SilentSOS backend running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();