const express = require('express');
const dbConnect = require('./config/db/dbConnect');
const cors = require('cors')
const dotenv = require('dotenv');
const { userRoute } = require('./route/userRoute/userRoute');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const { postRoute } = require('./route/postRoute/postRoute');
//dotenv config
dotenv.config();

const app = express();

app.use(express.json())

//connect db ;
dbConnect();

app.use(cors());

app.use('/api/users' , userRoute );

app.use('/api/posts', postRoute );

//error handling
app.use(notFound) ;
app.use(errorHandler);

const PORT = 5000;
app.listen(PORT , ()=> {
    console.log(`Server is started on PORT: ${PORT}`)
})
//43clZ889h569g3gx