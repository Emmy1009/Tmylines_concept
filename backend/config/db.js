import { neon } from "@neondatabase/serverless"
import "dotenv/config"

export const sql = neon(process.env.DATABASE_URL);

export const createTable = async ()=>{
  try {
    const table = await sql`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title TEXT,
        content TEXT,
        category TEXT,
        location TEXT,
        image_url TEXT NOT NULL
      )
    `
    console.log("Table created successfully")
  } catch (e) {
    console.log("Error creating post table:",e)
  }
}

export const adminTable = async()=>{
  try {
    const users = await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        fullname TEXT NOT NULL,
        image_url TEXT,
        email VARCHAR(100) NOT NULL UNIQUE CHECK(email LIKE '%@%.%'),
        password TEXT NOT NULL,
        owner BOOLEAN DEFAULT FALSE
      )
    `
    console.log("Users table created successfully…")
  } catch (e) {
    console.log("Error creating Users table:",e)
  }
}