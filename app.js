const express = require('express');
const app = express();
const connectDB = require('./config/db'); 
const loginRouter = require('./routes/loginRoute');
const registerRouter = require('./routes/registerRoute');
const emailVerfictionRouter = require('./routes/emailVerificationRoutes');
const changePasswordRouter = require('./routes/changePasswordRoutes');
const refreshTokenRouter = require('./routes/refreshTokenRoutes');
const esetPasswordRouterr = require('./routes/resetPasswordRoutes');
const resetPasswordRouterr = require('./routes/resetPasswordRoutes');

app.use(express.json());
connectDB();  

app.use(registerRouter);
app.use(loginRouter);
app.use(emailVerfictionRouter);
app.use(changePasswordRouter);
app.use(refreshTokenRouter);
app.use(resetPasswordRouterr);

app.listen(3000, '0.0.0.0', () => {
    console.log("Server is running on port 3000");
});