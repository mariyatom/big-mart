# 🛒 BigMart

BigMart is a full-stack e-commerce web application built with **React**, **Node.js**, **SQLite**, and **Zustand**. It allows users to browse products, add them to a cart,adjust the item quantity and place orders — all powered by a simple and efficient backend.

---

## 🚀 Tech Stack

- **Frontend:** React + TypeScript
- **State Management:** Zustand
- **Backend:** Node.js + Express + TypeScript
- **Database:** SQLite (via Knex.js)

---

## 📦 Features

- 🧾 View products by category  
- 🛒 Add/remove items from cart  
- 🔢 View total quantity of cart items  
- 🧼 Clear cart  
- 📬 Place an order (data saved to SQLite)
- Search the products

---


### 🧑‍💻 Admin CMS
- Manage categories, products, and orders.
- Add/edit/delete categories and products.
- View customer orders and history.
-----------

npm install
npm run knex migrate:latest  // for db
npm run knex seed:run        // for db
npm run dev                 // port 3000

# Boilerplate: Fullstack with Sass

## Setup

### What's included

This repo includes:

* a single, simple API endpoint (`/api/v1/fruits`)
* a single React component (`<App />`)
* an example database module (`server/db/fruits.js`)
* an API client module (`client/apis/fruits.js`)
* configuration for Vitest and testing library
* configuration for server-side debugging in VS Code
* configuration for preprocessing Sass

### Installation

#### **From the Github UI**

See the instructions [here](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template) to use Github's feature to create a new repo from a template.

#### **From the command line**

```
git clone https://github.com/dev-academy-challenges/boilerplate-fullstack [your-project-name]
cd [your-project-name]
npm install # to install dependencies
npm run dev # to start the dev server
```

You can find the server running on [http://localhost:3000](http://localhost:3000) and the client running on [http://localhost:5173](http://localhost:5173).

---
[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrJSkvT4Q/viewform?usp=pp_url&entry.1958421517=boilerplate-fullstack)

Git:
git add .
git commit -m "message"
git push origin branch-name
