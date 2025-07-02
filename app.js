const express = require('express');
const app = express();
const connectDB = require('./config/db'); 
const loginRouter = require('./routes/loginRoute');
const registerRouter = require('./routes/registerRoute');
const emailVerfictionRouter = require('./routes//emailVerfictionRoutes');
const changePasswordRouter = require('./routes/changePasswordRoutes');
const refreshTokenRouter = require('./routes/refreshTokenRoutes');
const resetPasswordRouterr = require('./routes/resetPasswordRoutes');
const menuItemRouter = require('./routes/menuItemRoutes');
const cartRouter = require('./routes/cartRoutes');
const orderRouter = require('./routes/orderRoutes');

app.use(express.json());
connectDB();  

app.use(registerRouter);
app.use(loginRouter);
app.use(emailVerfictionRouter);
app.use(changePasswordRouter);
app.use(refreshTokenRouter);
app.use(resetPasswordRouterr);
app.use(menuItemRouter);
app.use(cartRouter);
app.use(orderRouter);

app.listen(3000, '0.0.0.0', () => {
    console.log("Server is running on port 3000");
});