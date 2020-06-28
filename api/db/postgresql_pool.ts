import { Pool } from "pg";

// Database configuration parameters (for observation queries)
const ssdaConfig = {
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  password: process.env.DATABASE_PASSWORD,
  user: process.env.DATABASE_USER,
};

const createPool = (config: any) => {
  // Creating a pool of database connections
  const pool = new Pool(config);

  // Test the database connection
  (async () => {
    try {
      await pool.query("SELECT count(*) FROM users_tasks.user");
    } catch (e) {
      throw new Error("Connection to database failed.");
    }
  })();

  return pool;
};

// Creating pool of database connections
const dbConnectPool = createPool(ssdaConfig);

export { dbConnectPool };
