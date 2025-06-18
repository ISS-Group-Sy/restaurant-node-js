const express = require('express');
const app = express();
const connectDB = require('./config/db'); 
const loginRouter = require('./routes/loginRoute');
const registerRouter = require('./routes/registerRoute');
const emailVerfictionRouter = require('./routes/emailVerificationRoutes');

app.use(express.json());
connectDB();  

app.use(registerRouter);
app.use(loginRouter);
app.use(emailVerfictionRouter);

app.listen(3000, '0.0.0.0', () => {
    console.log("Server is running on port 3000");
});