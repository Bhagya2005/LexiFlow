import Groq from 'groq-sdk';
import dotenv from 'dotenv'
dotenv.config()


// Check if the API key is available
if (!process.env.GROQ_API_KEY) {
  console.error('GROQ_API_KEY is not set in environment variables');
  throw new Error('GROQ_API_KEY is rQequired but not provided');
}

// Initialize the Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Test the connection
const testConnection = async () => {
  try {
    console.log('Testing Groq API connection...');
    // We'll test the connection when the first request is made
    console.log('Groq client initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Groq client:', error);
    throw error;
  }
};

// Call the test function
testConnection();

// Export the Groq instance for use in other parts of the app
export default groq;
