import express from 'express';
import session from 'express-session';
import routes from './routes/routes.js';
import { fileURLToPath } from 'url';
import path from 'path';
import multer from 'multer';

const app = express();

// Resolve __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the project root directory
app.use(express.static(path.join(__dirname, '../')));

// Use routes from routes.js
app.use('/', routes);

// Fallback to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html')); // Explicitly serve index.html
});

// Start the server
app.listen(4000, () => {
  console.log('Server running at 4000');
});
