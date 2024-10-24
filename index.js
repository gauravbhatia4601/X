// Basic Express API structure (app.js)
import express, { json } from 'express';
import { config } from 'dotenv'; // Import dotenv
import bodyParser from "body-parser";

// Import routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import xRoute from './routes/xRoute.js';

const app = express();
// Create separate routers for each route
const authRouter = express.Router();
const userRouter = express.Router();
const tweetRouter = express.Router();
config(); // Load environment variables

// Enable CORS
app.use(bodyParser.json());
// app.use(cors());

// Middleware to set headers for CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all origins (replace '*' with specific origins if needed)
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', true);

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// Use the routes with their respective routers
authRoutes(authRouter);
userRoutes(userRouter);
xRoute(tweetRouter);

// Use routes directly without passing the router if they are not set up to accept it
app.use('/user', userRouter);
app.use('/tweet', tweetRouter);
app.use('/auth', authRouter);


app.get('/', async (req, res) => {
    try {
        console.log('server');
        res.send('Hello World!'); // Added response to the root route
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        console.log('final catch');
    }
});

const PORT = process.env.PORT || 3000; // Use PORT from .env or default to 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
