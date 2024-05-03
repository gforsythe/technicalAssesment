import express from 'express';
import { v4 as uuidv4, validate as validateUUID } from 'uuid';
import cors from 'cors';
import dotenv from 'dotenv'

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
dotenv.config()
/* Fake DATA */

const users = [
  { id: '123e4567-e89b-12d3-a456-426614174000', name: "Gabe", diet: "vegetarian" },
  { id: '123e4567-e89b-12d3-a456-426614174001', name: "Bianca", diet: "vegan" },
  { id: '123e4567-e89b-12d3-a456-426614174002', name: "Carmine", diet: "meat" },
  { id: '123e4567-e89b-12d3-a456-426614174003', name: "Ben", diet: "meat" },


];


/*routes - make a folder later on if time*/

/*home*/
app.get('/', (req, res) => {
  res.send("Hi! Welcome to My Technical Assesment!");
});



const validateUuidMiddleware = (req, res, next) => {
  const { id } = req.params;
  if (!validateUUID(id)) {
    return res.status(400).json({ error: 'Invalid UUID' });
  }
  next();
};


/*Get id*/
app.get('/id', (req, res,) => {

  res.status(200).json({ id: uuidv4() });
});


/* Get All Users*/

app.get('/api/v1/users', (req, res) => {
  res.status(200).json(users);
});

/* getuserInfo */
app.get('/api/v1/users/:id', validateUuidMiddleware, (req, res) => {
  const { id } = req.params;

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ error: 'User not  found.' });

  }
  /* Otherwise Return the user info */
  setTimeout(() => {
    res.status(200).json(user); // Return user details
  },287);


});


/* Create a new user */
app.post('/api/v1/users', (req, res) => {

  try {
    //creating my 50% chance of success
    const success = Math.random() > 0.5;

    if (!success) {
      return res.status(500).json({ error: 'Failed to save user.' });
    }

    //Validation for New User:

    const { name, diet } = req.body;
    const allowedDiets = ['meat', 'vegan', 'vegetarian'];

    if (!name || name.length < 1) {
      return res.status(400).json({ error: 'Name must have at least one character.' });
    }

    if (!allowedDiets.includes(diet)) {
      return res.status(400).json({ error: 'Diet has to be meat,vegan, or vegetarian' });
    }

    const existingUser = users.find(u => u.name === name);
    if (existingUser) {
      return res.status(409).json({ error: 'User with this name already exists.' });
    }
    const newId = uuidv4();
    const newUser = {
      id: newId,
      name,
      diet,
    };
    users.push(newUser);
    return res.status(201).json({ message: `Success! ${newUser.name} was added`, newUser });
  } catch (error) {
    console.error('Error in Post /api/v1/users', error);
    res.status(500).json({ error: 'Unable to create new userr' });
  }

});



app.listen(process.env.PORT || 3000, () => {
  console.log(`listening on Port:${PORT}`);
});



export default app;