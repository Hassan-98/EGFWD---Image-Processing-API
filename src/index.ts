import express, { Request, Response } from 'express';

// Modules
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';

//= Routes
import API_Router from './routes/api.route';

//= Error Handler
import errorHandlerMiddleware from './middlewares/error.handler.middleware';

//= Read .env file
dotenv.config();

//= Server Port
const port = process.env.PORT || 3000;

//= Create express app
const app = express();

// Setting JSON in Body Of Requests
app.use(express.json())
// FormData Body Parser
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ 
  limit: '50mb',
  extended: true 
}));
// Req & Res Compressor
app.use(compression());
// Morgan Logger
app.use(morgan(':method :url :status - :response-time ms'));
// Cross-Origin Resource Sharing
app.use(cors());


//= App Routes 
app.get('/', (req: Request, res: Response) => {
  res.json({
    "API": "Image Processing API",
    "Author": "Hassan Ali",
    "Version": "1.0.0",
    "Description": "EGFWD - Project 1 Image Processing API",
    "Created At": "2022-08-15",
    "Contact": "7assan.3li1998@gmail.com"
  });
});

//= API Routes
app.use('/api', API_Router);

//= Error Handler
app.use(errorHandlerMiddleware);

//= Start server
app.listen(port, () => {
  console.log('\x1b[32m%s\x1b[0m', `\n✅ [Server] running on port ${port}`);
});