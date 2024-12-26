//Import necessary modules
const express = require('express'); //To create Express app
const mongoose = require('mongoose'); //For mongoDB interaction
const cors = require('cors'); //To handle CORS
const dotenv = require('dotenv'); //To load environment variables
const authRoutes = require('./routes/authRoutes'); //Auth routes (login, register)
const productRoutes = require('./routes/productRoutes'); //Auth routes (add product)
const bodyParse = require('body-parser');   // Middleware to parse incoming request bodies


//Load environment variable
dotenv.config();

//Initialize the Express app
const app = express();

//Middleware for parsing JSON data from the body of the request
app.use(express.json());

//Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());
// app.use(bodyParse.json());  // Parse JSON request bodies


//Connect mongoDB using the URI from the environment variable
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

//Seet up routes
app.use('/api/auth' , authRoutes); //Handle authentication routes (register, login)
app.use('/api/product' , productRoutes); //Handle product routes (add product)

//Set the server to listen o-n a specific port (using environment variable or default 8000)
const PORT = process.env.PORT || 7000;
app.listen(PORT, () =>{
    console.log("Server is running at port : ", PORT)

});