Store Rating Platform

A full-stack web application where users can register, log in, browse stores, and submit ratings.
The platform supports three user roles — Admin, Store Owner, and Normal User — with secure role-based access control.


Tech Stack:-
          Frontend: React (Vite)
          Backend: Node.js, Express.js
          Database: MySQL
          Authentication: JWT (JSON Web Token)
          HTTP Client: Axios

User Roles & Features:-

1) Admin:-
          - Add and manage stores
          - Add users (Admin, Store Owner, Normal User)
          - View dashboard statistics:
          - Total Users
          - Total Stores
          - Total Ratings
          - View and filter:
          - Users (by Name, Email, Address, Role)
          - Stores (by Name, Address)
          - Apply sorting (ascending/descending) on all tables
          - View store ratings
          - Logout

2) Store Owner:-
          - View ratings for their store
          - View average store rating
          - Update password
          - Logout

3) Normal User:- 
          - Sign up and log in
          - View all registered stores
          - Search stores by Name and Address
          - View:
          - Store Name
          - Address
          - Overall Rating
          - Their own submitted rating
          - Submit or update ratings (1 to 5)
          - Update password
          - Logout


* How to Run
 - Backend:- 
            - cd backend
            - npm install
            - node server.js

 - Frontend:-
            - cd frontend
            - cd vite-project
            - npm install
            - npm run dev

* Author
- Dnyaneshwar Dadabhau Patil
  Full Stack Developer
