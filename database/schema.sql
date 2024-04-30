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
  "createdAt" timestamptz default now()
);

CREATE TABLE "users" (
  "userId" serial PRIMARY KEY,
  "hashedPassword" text,
  "email" text,
  "firstName" text,
  "lastName" text,
  "createdAt" timestamptz default now()
);

CREATE TABLE "orders" (
  "orderId" serial PRIMARY KEY,
  "amount" integer,
  "userId" integer,
  "createdAt" timestamptz default now()
);

CREATE TABLE "inventory" (
  "inventoryId" serial PRIMARY KEY,
  "productId" integer,
  "size" integer,
  "quantity" integer,
  "createdAt" timestamptz default now()
);


CREATE TABLE "cartItems" (
  "cartItemId" serial PRIMARY KEY,
  "userId" integer,
  "productId" integer,
  "quantity" integer,
  "size" numeric,
  "createdAt" timestamptz default now()
);

CREATE TABLE "orderItems" (
  "orderItemId" serial PRIMARY KEY,
  "productId" integer,
  "amount" integer,
  "quantity" integer,
  "orderId" integer,
  "createdAt" timestamptz default now()
);

ALTER TABLE "cartItems" ADD FOREIGN KEY ("productId") REFERENCES "products" ("productId");

ALTER TABLE "inventory" ADD FOREIGN KEY ("productId") REFERENCES "products" ("productId");

ALTER TABLE "orderItems" ADD FOREIGN KEY ("productId") REFERENCES "products" ("productId");

ALTER TABLE "orders" ADD FOREIGN KEY ("userId") REFERENCES "users" ("userId");

ALTER TABLE "cartItems" ADD FOREIGN KEY ("userId") REFERENCES "users" ("userId");

ALTER TABLE "orderItems" ADD FOREIGN KEY ("orderId") REFERENCES "orders" ("orderId");
