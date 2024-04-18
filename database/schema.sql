set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "products" (
  "productId" serial PRIMARY KEY,
  "name" text,
  "brand" text,
  "style" text,
  "image" text,
  "details" text,
  "amount" integer,
  "createdAt" timestamptz
);

CREATE TABLE "users" (
  "userId" serial PRIMARY KEY,
  "password" text,
  "email" text,
  "createdAt" timestamptz
);

CREATE TABLE "orders" (
  "orderId" serial PRIMARY KEY,
  "amount" integer,
  "userId" integer,
  "createdAt" timestamptz
);

CREATE TABLE "inventory" (
  "inventoryId" serial PRIMARY KEY,
  "productId" integer,
  "size" integer,
  "quantity" integer,
  "createdAt" timestamptz
);

CREATE TABLE "carts" (
  "cartId" serial PRIMARY KEY,
  "userId" integer,
  "createdAt" timestamptz
);

CREATE TABLE "cartItems" (
  "cartItemId" serial PRIMARY KEY,
  "cartId" integer,
  "productId" integer,
  "quantity" integer,
  "createdAt" timestamptz
);

CREATE TABLE "orderItems" (
  "orderItemId" serial PRIMARY KEY,
  "productId" integer,
  "amount" integer,
  "quantity" integer,
  "orderId" integer,
  "createdAt" timestamptz
);

ALTER TABLE "cartItems" ADD FOREIGN KEY ("productId") REFERENCES "products" ("productId");

ALTER TABLE "inventory" ADD FOREIGN KEY ("productId") REFERENCES "products" ("productId");

ALTER TABLE "orderItems" ADD FOREIGN KEY ("productId") REFERENCES "products" ("productId");

ALTER TABLE "orders" ADD FOREIGN KEY ("userId") REFERENCES "users" ("userId");

ALTER TABLE "carts" ADD FOREIGN KEY ("userId") REFERENCES "users" ("userId");

ALTER TABLE "cartItems" ADD FOREIGN KEY ("cartId") REFERENCES "carts" ("cartId");

ALTER TABLE "orderItems" ADD FOREIGN KEY ("orderId") REFERENCES "orders" ("orderId");
