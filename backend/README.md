# AI-Powered Blog and Email Generation Backend

This is the backend for the AI-Powered Blog and Email Generation application. It provides APIs for user authentication , blog generation and email generation using AI.

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   GROQ_API_KEY=your_groq_api_key
   JWT_KEY=your_jwt_secret_key
   PORT=3000
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

- `POST /user/register` - Register a new user
- `POST /user/login` - Login a user
- `POST /blog/generateblog` - Generate a blog post (requires authentication)
- `POST /email/generateemail`- Generate a email post (requires authentication)

## CORS Configuration

The backend is configured to allow requests from the following origins:
- `http://localhost:8080`
- `http://127.0.0.1:8080`
- `http://localhost:5173`
- `http://127.0.0.1:5173`
- `http://localhost:8081`
- `http://127.0.0.1:8081`


If you need to add more origins, update the CORS configuration in `src/app.js`. 