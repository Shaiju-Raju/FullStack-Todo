import pkg from "pg";
import dotenv from "dotenv";

dotenv.config(); // 🔥 THIS LINE WAS MISSING

const { Pool } = pkg;

let pool;

if (process.env.DATABASE_URL) {
  // ✅ Production (Render)
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },

  max: 5,                // max connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  });
} else {
  // ✅ Local Development
  pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });
}

export default pool;
