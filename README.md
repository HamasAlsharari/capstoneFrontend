# Project & Repository Description

ExpenseTracker is a web app that helps users manage their personal finances. 
Users can track expenses, categorize them, and manage payment methods. 
The app includes authentication, a clean UI, and full CRUD for expenses, categories, and payment methods.

# Tech Stack

- React
- React Router
- Vite 
- JavaScript
- HTML
- CSS

# Backend Repository Link

https://github.com/HamasAlsharari/capstoneBackend

# Frontend Site 

http://localhost:5173/

# Installation Instructions

## Using Docker
1. Make sure Docker is installed and running on your machine.
2. Navigate to the frontend project directory:
   ```bash
   cd capstoneFrontend
3. Build and start the container:
    docker compose up --build
4. Access the frontend app in your browser at: http://localhost:5173

Without Docker (Optional)
1. Navigate to the frontend project directory:
    cd capstoneFrontend
2. Install dependencies:
    npm install
3. Start the development server:
    npm run dev
4.	Open the app in your browser at: http://localhost:5173

# Routing Table Frontend

### Authentication & General Routes
| Route | Component | Description |
|-------|-----------|-------------|
| / | HomePage.jsx | Home Page |
| /login | LoginPage.jsx | Login |
| /signup | SignupPage.jsx | Signup |
| /about | AboutPage.jsx | About page |


### Expenses
| Route | Component | Description |
|-------|-----------|-------------|
| /expenses | ExpensesList.jsx | List all expenses |
| /expenses/:id | ExpenseDetails.jsx | Expense details |
| /expenses/new | ExpenseForm.jsx | Add new expense |
| /expenses/edit/:id | ExpenseForm.jsx | Edit expense |
| /expenses/confirm_delete/:id | ExpenseForm.jsx | Delete expense |


### Categories
| Route | Component | Description |
|-------|-----------|-------------|
| /categories | CategoryList.jsx | List all categories |
| /categories/:id | CategoryDetail.jsx | Category details |
| /categories/new | CategoryForm.jsx | Add new category |
| /categories/edit/:id | CategoryForm.jsx | Edit category |
| /categories/confirm_delete/:id | CategoryForm.jsx | Delete category |


### Payment Methods
| Route | Component | Description |
|-------|-----------|-------------|
| /payment-methods | PaymentList.jsx | List payment methods |
| /payment-methods/:id | PaymentDetail.jsx | Payment method details |
| /payment-methods/new | PaymentForm.jsx | Add payment method |
| /payment-methods/edit/:id | PaymentForm.jsx | Edit payment method |
| /payment-methods/confirm_delete/:id | PaymentMethodForm.jsx | Delete payment method |


### Profile
| Route | Component | Description |
|-------|-----------|-------------|
| /profile | Profile.jsx | User profile |
| /profile/edit | ProfileForm.jsx | Edit profile |


# IceBox Features / Future Features:

- Add user profile management and settings.
- Implement charts and graphs for expense analysis.
- Add notifications and reminders for recurring expenses.
- Integrate with third-party financial APIs.
