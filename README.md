# Cafe Website

A full-stack cafe ordering website with a React frontend and an Express backend.

## Customer Experience
- Home page and menu page
- Cart state shared through a React context provider
- Cart drawer for reviewing selected items
- Checkout page
- Single-page application routing

## Architecture
```text
client/   React + Vite frontend
server/   Express backend
```

### Frontend
- React 19, Vite
- Wouter routing
- Tailwind CSS
- Framer Motion
- Axios

### Backend
- Node.js
- Express 5
- CORS
- dotenv

## Run Locally
Open two terminals.

**1. Start the backend**
```bash
cd server
npm install
npm start
```

**2. Start the frontend**
```bash
cd client
npm install
npm run dev
```

Vite prints the frontend URL in the terminal. Configure the API endpoint for your local backend in the client before testing API-dependent functionality.

## Deployment
The client package includes a GitHub Pages deployment script. The backend is a separate service and must be deployed to a Node.js hosting provider if the live site depends on server endpoints.

## Before Production
Configure environment variables, validate checkout inputs on the server, and connect a secure payment provider if payments are required. Do not treat a frontend checkout page as proof that payment processing is implemented.
