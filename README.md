# Allbirds MERN E-Commerce Website

## Project Overview

A full-stack e-commerce website inspired by the Allbirds brand, built using the MERN Stack (MongoDB, Express.js, React, and Node.js).

The application allows users to browse products, search and filter items, manage a wishlist, add products to a shopping cart, complete checkout, and view previous orders through a user profile dashboard.

---

## Features

### User Authentication

* User registration
* User login
* JWT authentication
* Protected routes
* Persistent login sessions

### Product Catalog

* Product listing from MongoDB Atlas
* Product detail page
* Category filtering
* Product search
* Sorting options
* Price range filtering

### Shopping Cart

* Add products to cart
* Update quantities
* Remove products
* Persistent cart storage
* Cart total calculation

### Wishlist

* Add products to wishlist
* Remove products from wishlist
* Wishlist persistence after refresh
* Wishlist persistence after logout/login

### Checkout & Orders

* Checkout form
* Order creation
* Orders stored in MongoDB
* Order history page
* Cart automatically clears after successful checkout

### Responsive Design

* Desktop responsive layout
* Tablet responsive layout
* Mobile responsive layout
* Responsive navigation menu
* Responsive footer
* Mobile overflow fixes

---

## Tech Stack

### Frontend

* React
* Context API
* Axios
* Vite

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcryptjs

---

## Project Structure

Frontend

src/

* api/
* components/
* context/
* pages/
* assets/

Backend

* config/
* controllers/
* middleware/
* models/
* routes/
* data/

---

## Environment Variables

Create a .env file in both the Frontend and Backend directories.

Backend variables:
- PORT
- MONGO_URI
- JWT_SECRET

Frontend variables:
- VITE_API_URL

---

## Installation

### Clone Repository

git clone <repository-url>

### Backend Setup

cd Backend

npm install

npm run dev

### Frontend Setup

cd Frontend

npm install

npm run dev

---

## Build Production Version

Frontend

npm run build

---

## API Routes

### Authentication

POST /api/auth/register

POST /api/auth/login

GET /api/auth/profile

### Products

GET /api/products

GET /api/products/:id

### Cart

GET /api/cart

POST /api/cart/add

PUT /api/cart/update/:id

DELETE /api/cart/remove/:id

DELETE /api/cart/clear

### Wishlist

GET /api/wishlist

POST /api/wishlist

### Orders

POST /api/orders

GET /api/orders/myorders

---

## Future Improvements

### Phase 2 Features

* Admin Dashboard
* Product Management (CRUD)
* Order Management
* Payment Integration (Stripe / Paystack)
* Product Reviews
* Product Ratings
* Inventory Management

---

## Author

Samuel Chinwuba

MERN Stack E-Commerce Project

2026
