const express       = require('express')
const connectDB     = require('./config/dbConnection');
const cookieParser  = require('cookie-parser')
const fileUpload    = require('express-fileupload')
const bodyParser    = require('body-parser')
const dotenv        = require('dotenv').config()
const app           = express();
const port          = process.env.PORT || 5000;
const errorHandler = require('./middleware/errorHandler');

const cloudinary = require("cloudinary").v2
// Configuration 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

connectDB()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())
app.use(cookieParser());

app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => console.log(`Listening on port ${port}`));