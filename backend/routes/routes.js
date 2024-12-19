import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import mongoose from 'mongoose';
import { register } from './schema.js';  // Import the Register model
import bcrypt from 'bcrypt';

const app = express();
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.urlencoded({ extended: false }));

// Updated MongoDB connection string with your username and password
await mongoose
  .connect('mongodb+srv://raghavmittal26113:ZawF0ydqqdWy3ILQ@cluster0.vufzf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('Connected to database successfully');
  })
  .catch((error) => {
    console.log('Error in connecting to database:', error);
  });

app.use(express.json());

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html')); //homepage
});

// Uncomment HTML files from the root directory as you need
//router.get('/home', (req, res) => {
// res.sendFile(path.join(__dirname, '..', 'index.html'));  // Correct path to the root
// });

//router.get('/signin', (req, res) => {
//  res.sendFile(path.join(__dirname, '..', 'login.html'));  // Correct path to the root
// });

// router.get('/register', (req, res) => {
//  res.sendFile(path.join(__dirname, '..', 'register.html'));  // Correct path to the root
// });

// router.get('/about', (req, res) => {
//  res.sendFile(path.join(__dirname, '..', 'about.html'));  // Correct path to the root
// });

// Register User
router.post('/submit', async (req, res) => {
  // Fetching data from signup page
  const userData = req.body;
  console.log(userData);
  const verifyemail = userData.email;

  const existing_user = await register.findOne({ email: verifyemail });

  if (existing_user) {
    console.log('Email already exists');
    res.send('Email already exists, Signin');
    return;
  }

  const newuserdata = new register({
    name: userData.name,
    email: userData.email,
    password: userData.password,
  });

  await newuserdata
    .save()
    .then(() => console.log('User registered'))
    .catch(() => console.log('Error registering'));

  res.send('Data received and user registered');
});

router.post('/authenticateuser', async (req, res) => {
  // Fetching data from signin page
  const authenticate = req.body;
  const check_email = authenticate.email;
  const verify_password = authenticate.password;

  const verify_email = await register.findOne({ email: check_email });

  if (!verify_email) {
    res.status(400).send('Wrong E-mail or Password');
    return;
  } else {
    if (verify_password === verify_email.password) {
      res.status(200).send('Successful User');
      return;
    } else {
      console.log('Wrong e-mail or password');
      res.status(400).send('Wrong e-mail or password');
      return;
    }
  }
});

// Uncomment the following route if needed
// router.post('/ques', async(req,res)=>{
//     const saveques = new ques({
//         email:req.session.email.email,
//         ques:req.body.ques
//     });
//     await saveques.save().then(() => console.log('Question registered')).catch(() => console.log("Not registered Question"));
//     res.send("Ques saved");
// });

export default router;