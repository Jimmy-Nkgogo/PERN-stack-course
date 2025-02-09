import { neon } from "@neondatabase/serverless"
import dotenv from "dotenv"

dotenv.config();

const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE, ARCJECT_KEY  } = process.env;

// creates a SQL connection
export const sql = neon(`postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`)
