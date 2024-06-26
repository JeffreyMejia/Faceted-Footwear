/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express, { application } from 'express';
import pg from 'pg';
import {
  ClientError,
  defaultMiddleware,
  errorMiddleware,
  authMiddleware,
} from './lib/index.js';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';

type User = {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  hashedPassword: string;
};
type Auth = {
  email: string;
  password: string;
};

const hashKey = process.env.TOKEN_SECRET;
if (!hashKey) throw new Error('TOKEN_SECRET not found in .env');

pg.types.setTypeParser(pg.types.builtins.NUMERIC, (x) => parseFloat(x));

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
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

app.post('/api/auth/signUp', async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName) throw new ClientError(400, 'First Name is required!');
    if (!lastName) throw new ClientError(400, 'Last Name is required!');
    if (!email) throw new ClientError(400, 'Email is required!');
    if (!password) throw new ClientError(400, 'Password is required!');
    const hash = await argon2.hash(password);
    const sql = `
    insert into "users" ("firstName", "lastName", "email", "hashedPassword")
    values ($1, $2, $3, $4)
    returning *
    `;
    const params = [firstName, lastName, email, hash];
    const results = await db.query(sql, params);
    const [newUser] = results.rows;
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

app.post('/api/auth/sign-in', async (req, res, next) => {
  try {
    const { email, password } = req.body as Partial<Auth>;
    if (!email || !password) {
      throw new ClientError(401, 'invalid login');
    }
    const sql = `
      select * from "users"
      where "email" = $1
      `;
    const params = [email];
    const results = await db.query(sql, params);
    const user = results.rows[0];
    if (!user) {
      throw new ClientError(401, 'invalid login');
    }
    const verf = await argon2.verify(user.hashedPassword, password);
    if (!verf) {
      throw new ClientError(401, 'invalid login');
    }
    const userPayload = { userId: user.userId, username: user.username };
    const token = jwt.sign(userPayload, hashKey);
    res.status(200).json({ user: userPayload, token });
  } catch (err) {
    next(err);
  }
});

app.get(`/api/catalog`, async (req, res, next) => {
  try {
    const { style, brand } = req.query;
    const sql = `
     select * from "products"
                `;
    const styleWhere = style ? 'where style = $1' : '';
    const brandWhere = brand ? 'where brand = $1' : '';
    const params = style || brand ? [style || brand] : [];
    const results = await db.query(sql + styleWhere + brandWhere, params);
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

app.get('/api/catalog/brands', async (req, res, next) => {
  try {
    const sql = `
    select "brand"
    from "products"
    group by "brand"
    order by "brand"
    `;
    const results = await db.query(sql);
    const brand = results.rows;
    res.status(200).json(brand);
  } catch (error) {
    next(error);
  }
});

app.get('/api/carousel', async (req, res, next) => {
  try {
    const sql = `
     select * from "products"
     order by RANDOM()
     limit 6
     `;
    const results = await db.query(sql);
    const carousel = results.rows;
    res.status(200).json(carousel);
  } catch (error) {
    next(error);
  }
});

app.delete('/api/checkout', authMiddleware, async (req, res, next) => {
  try {
    const sql = `
      delete from "cartItems"
      where "userId" = $1
      returning*
    `;
    const results = await db.query(sql, [req.user?.userId]);
    const noCart = results.rows;
    if (!noCart) throw new ClientError(404, 'User Id not found!');
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

app.get('/api/catalog/cart', authMiddleware, async (req, res, next) => {
  try {
    const sql = `
    select * from "cartItems"
    join "products" using ("productId")
    where "userId" = $1
    `;
    const results = await db.query(sql, [req.user?.userId]);
    const cart = results.rows;
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
});

app.post('/api/catalog/cart', authMiddleware, async (req, res, next) => {
  try {
    const { productId, quantity, size } = req.body;
    if (!productId) throw new ClientError(400, 'productId required!');
    if (!quantity) throw new ClientError(400, 'quantity required!');
    if (!size) throw new ClientError(400, 'size required!');
    const sql = `
     insert into "cartItems" ("userId", "productId", "quantity", "size")
     values ($1, $2, $3, $4)
     returning *
                `;
    const params = [req.user?.userId, productId, quantity, size];
    const results = await db.query(sql, params);
    const newCart = results.rows[0];
    res.status(201).json(newCart);
  } catch (error) {
    next(error);
  }
});

app.delete(
  '/api/catalog/cart/:productId/:size',
  authMiddleware,
  async (req, res, next) => {
    try {
      const { productId, size } = req.params;
      const { userId } = req.body;
      const sql = `
       delete from "cartItems"
       where "productId" = $1 and "size" =$2 and "userId" = $3
       returning *
                 `;
      const params = [productId, size, req.user?.userId];
      const results = await db.query(sql, params);
      const deletedCartItem = results.rows[0];
      if (!deletedCartItem)
        throw new ClientError(404, `error could not find ${productId}`);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
);

app.put(
  '/api/catalog/cart/:productId',
  authMiddleware,
  async (req, res, next) => {
    try {
      const { productId } = req.params;
      const { quantity, size, userId } = req.body;
      const sql = `
    update "cartItems"
    set "quantity" = $1
    where "productId" = $2
    and "size" = $3
    and "userId" = $4
    returning*
    `;
      const params = [quantity, productId, size, req.user?.userId];
      const results = await db.query(sql, params);
      const updatedProduct = results.rows[0];
      if (!updatedProduct) {
        throw new ClientError(404, `error ${productId} does not exist`);
      }
      res.status(200).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }
);

app.get('/api/wishlist', authMiddleware, async (req, res, next) => {
  try {
    const { userId } = req.body;
    if (!userId) throw new ClientError(400, 'User Id required!');
    const sql = `
    select * from "cartItems"
    where "userId" = $1
    `;
    const params = [req.user?.userId];
    const results = await db.query(sql);
    const wishlist = results.rows;
    res.status(200).json(wishlist);
  } catch (error) {
    next(error);
  }
});

app.post('/api/wishlist/', authMiddleware, async (req, res, next) => {
  try {
    const { productId, userId } = req.body;
    if (!productId) throw new ClientError(400, 'productId required!');
    const sql = `
     insert into "wishlists" ( "productId", "userId")
     values ($1, $2)
     returning *
                `;
    const params = [productId, req.user?.userId];
    const results = await db.query(sql, params);
    const wishlistItem = results.rows[0];
    res.status(201).json(wishlistItem);
  } catch (error) {
    next(error);
  }
});

app.delete(
  '/api/wishlist/:productId',
  authMiddleware,
  async (req, res, next) => {
    try {
      const { productId } = req.params;
      const { userId } = req.body;
      const sql = `
       delete from "wishlists"
       where "productId" = $1
       and "userId" = $2
       returning *
                 `;
      const params = [productId, req.user?.userId];
      const results = await db.query(sql, params);
      const deletedCartItem = results.rows[0];
      if (!deletedCartItem)
        throw new ClientError(404, `error could not find ${productId}`);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
);

/*
 * Middleware that handles paths that aren't handled by static middleware
 * or API route handlers.
 * This must be the _last_ non-error middleware installed, after all the
 * get/post/put/etc. route handlers and just before errorMiddleware.
 */
app.use(defaultMiddleware(reactStaticDir));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
