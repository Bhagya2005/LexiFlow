import blogRouter from './routes/blogRoute.js'
import express from 'express';
import userRouter from './routes/userRoutes.js'
import emailRouter from './routes/emailRoutes.js';

import cors from 'cors';

const app= express();

// CORS configuration
app.use(cors({
    origin: [
        'http://localhost:8080', 
        'http://127.0.0.1:8080', 
        'http://localhost:5173', 
        'http://127.0.0.1:5173', 
        'http://localhost:8081', 
        'http://127.0.0.1:8081'
    ], // Add your frontend URLs
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());
app.use('/user', userRouter);
app.use('/email', emailRouter);

app.use('/blog',blogRouter);
console.log('App configured successfully');

export default app;




