/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import {
  ClientError,
  defaultMiddleware,
  errorMiddleware,
} from './lib/index.js';

const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DB_NAME}`;
const db = new pg.Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.get(`/api/catalog`, async (req, res, next) => {
  try {
    const { style } = req.query;
    const sql = `
    select * from "products"
    `;
    const where = style ? 'where style = $1' : '';
    const params = style ? [style] : [];
    const results = await db.query(sql + where, params);
    const footwearStyles = results.rows;
    res.status(200).json(footwearStyles);
  } catch (error) {
    next(error);
  }
});

app.get('/api/catalog/details/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params;
    if (!Number.isInteger(+productId)) {
      throw new ClientError(400, 'productId must be a number');
    }
    const sql = `
    select * from "products"
    where "productId" = $1
    `;
    const params = [productId];
    const results = await db.query(sql, params);
    const [product] = results.rows;
    if (!product) throw new ClientError(404, 'Error that id does not exist!');
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

app.get('/api/catalog/search', async (req, res, next) => {
  try {
    const { q } = req.query;
    const sql = `
   select * from "products"
   where "name" ilike $1 or "style" ilike $1 or "brand" ilike $1
   `;
    const params = [`%${q}%`];
    const results = await db.query(sql, params);
    const search = results.rows;
    res.status(200).json(search);
  } catch (error) {
    next(error);
  }
});

/*
 * Middleware that handles paths that aren't handled by static middleware
 * or API route handlers.
 * This must be the _last_ non-error middleware installed, after all the
 * get/post/put/etc. route handlers and just before errorMiddleware.
 */
app.use(defaultMiddleware(reactStaticDir));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
