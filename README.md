# Todo App Frontend

This is the frontend for the Todo App built with React and Vite. It allows users to manage their tasks by adding, viewing, and deleting notes. The frontend communicates with the backend hosted on Render.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Running the Frontend](#running-the-frontend)
- [Features](#features)
- [Backend Repository](#backend-repository)
- [Deployment](#deployment)
- [CORS Configuration](#cors-configuration)
- [License](#license)
- [Troubleshooting](#troubleshooting)
- [Contact](#contact)

## Prerequisites
Ensure you have the following installed:
- Node.js (v16 or higher)
- A backend service running (check [Backend Repository](#backend-repository))

## Environment Variables
Create a `.env` file in the root directory to store any environment-specific variables, such as:
```bash
VITE_API_URL=Your backend deployment site
```
This ensures the frontend communicates with the backend API.

## Installation
Clone the repository:
```bash
git clone <frontend-repo-url>
cd <repository-folder>
```
Install dependencies:
```bash
npm install
```

## Running the Frontend
To start the frontend locally:
```bash
npm run dev
```
This will start the development server, usually accessible at `http://localhost:5173`.

## Features
- Add, view, and delete notes
- Real-time updates on note addition or deletion
- Communicates with backend API for data persistence

## Backend Repository
The backend service for this app is hosted on Render.  
Check out the Todo App Backend Repository for more details.
You can access it [here](https://github.com/mayurk224/Todo_Backend).

## Deployment
The frontend is deployed on Vercel. You can access it [here](https://todo-frontend-chi-rouge.vercel.app).

## CORS Configuration
The backend is configured to allow requests from the Vercel frontend:
```javascript
app.use(
  cors({
    origin: "Your frontend deployment site",
    methods: ["GET", "POST", "DELETE"],
  })
);
```
Ensure your backend origin matches your Vercel deployment URL.

## License
This project is licensed under the MIT License.

## Troubleshooting
- **CORS Errors**: Ensure both the frontend and backend URLs are correct and CORS policies match.
- **API URL Issues**: Double-check the `VITE_API_URL` value in your `.env` file.
- **Backend Connectivity**: Ensure the backend is running and accessible at the specified URL.

## Contact
If you have any questions or need support, feel free to reach out to:  
**Mayur Dilip Kamble**  
Email: [mayurkamble0250@gmail.com](mailto:mayurkamble0250@gmail.com)
