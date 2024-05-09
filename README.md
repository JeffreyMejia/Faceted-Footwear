# Faceted Footwear

Application that allows users browse and shop a catalog of varied footwear.

## Why I built this

As a sneaker and boot enthusiast I wanted to build an e-commerce site that appealed to my interests.

## Technologies Used

- React.js
- Tailwind
- Node.js
- Postgres
- HTML5
- CSS3

## Live site

Try the application live at [Faceted-Footwear](http://ec2-54-183-92-201.us-west-1.compute.amazonaws.com/)

## Features

- User can browse a catalog of different types of footwear.
- User can view details of individual catalog items.
- User can search through catalog
- User can create an account
- User can add and remove items from a wishlist
- User can add and remove items from their cart

## Preview

![search](md.assets/Animation-3.gif)

![browsing](md.assets/Animation-1.gif)

## Stretch Features

A few features I wish to add in the future

- User can leave a review for items
- User can view order history

## Getting Started

---

### Clone Repo

1. From your newly created repo on GitHub, click the green `<> Code` button, then copy **SSH** URL
1. Open VS Code, click on blue `><` button in bottom left
   1. Select `Clone Repository in Container Volume...`
   1. Paste **SSH** URL for your repo, click `Clone git repository from URL`

---

### Run and test project setup

#### Getting Started

1. Install all dependencies with `npm install`.

#### start postgres to use database

1. Start PostgreSQL
   ```sh
   sudo service postgresql start
   ```

#### Start the development servers

1. Start all the development servers with the `"dev"` script:
   ```sh
   npm run dev
   ```
1. Later, when you wish to stop the development servers, type `Ctrl-C` in the terminal where the servers are running.

1. In a separate terminal, run `npm run db:import` to create your tables

1. After any changes to `database/schema.sql` or `database/data.sql` re-run the `npm run db:import` command to update your database. Use `psql` to verify your changes were successfully applied.

### Available `npm` commands explained

Below is an explanation of all included `npm` commands in the root `package.json`. Several are only used for deployment purposes and should not be necessary for development.

1. `start`
   - The `start` script starts the Node server in `production` mode, without any file watchers.
1. `build`
   - The `build` script executes `npm run build` in the context of the `client` folder. This builds your React app for production. This is used during deployment, and not commonly needed during development.
1. `db:import`
   - The `db:import` script executes `database/import.sh`, which executes the `database/schema.sql` and `database/data.sql` files to build and populate your database.
1. `dev`
   - Starts all the development servers.
1. `lint`
   - Runs ESLint against all the client and server code.
1. Not directly used by developer
   1. `install:*`
   - These scripts install dependencies in the `client` and `server` folders, and copy `.env.example` to `.env` if it doesn't already exist.
   1. `dev:*`
   - These scripts start the individual development servers.
   1. `lint:*`
   - These scripts run lint in the client and server directories.
   1. `postinstall`
      - The `postinstall` script is automatically run when you run `npm install`. It is executed after the dependencies are installed. Specifically for this project the `postinstall` script is used to install the `client` and `server` dependencies.
   1. `prepare`
      - The `prepare` script is similar to `postinstall` — it is executed before `install`. Specifically for this project it is used to install `husky`.
   1. `deploy`
      - The `deploy` script is used to deploy the project by pushing the `main` branch to the `pub` branch, which triggers the GitHub Action that deploys the project.
