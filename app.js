const express = require('express');
const app = express();
const connectDB = require('./config/db'); 
const errorHandlerRegisterMiddleware = require('./middleware/registerErrorHandler');
const registerRouter = require('./routes/registerRoute');

app.use(express.json());
connectDB();  

app.use(registerRouter);
app.use(errorHandlerRegisterMiddleware);

app.listen(3000, '0.0.0.0', () => {
    console.log("Server is running on port 3000");
});