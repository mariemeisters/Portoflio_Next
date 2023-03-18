import { Pool } from 'pg';
import { User } from "../types/type"


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;

export async function getAllClients() {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT DISTINCT client FROM test ORDER BY client"
    );
    client.release();
    return result.rows.map((row) => row.client);
  }
  
  export async function getProjectsForClient(client: string) {
    const clientDb = await pool.connect();
    const result = await clientDb.query(
      "SELECT id, title, description, client, annee FROM test WHERE client=$1",
      [client]
    );
    clientDb.release();
    return result.rows;
  }
  
  export async function getUserByEmail(email: string): Promise<User | null> {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT * FROM users WHERE email = $1::text",
      [email]
    );
    client.release();
    if (result.rowCount === 0) {
      return null;
    }
    const user: User = {
      pseudo: result.rows[0].pseudo,
      email: result.rows[0].email,
      motdepasse: result.rows[0].motdepasse,
    };
    console.log('connecté!')
    return user;
  }
  
  