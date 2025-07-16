require('dotenv').config();

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
const profilRouter = require('./routes/profileRoutes');
const path = require('path');
const logoutRouter = require('./routes/logoutRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');



app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

connectDB();  
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(registerRouter);
app.use(loginRouter);
app.use(emailVerfictionRouter);
app.use(changePasswordRouter);
app.use(refreshTokenRouter);
app.use(resetPasswordRouterr);
app.use(menuItemRouter);
app.use(cartRouter);
app.use(orderRouter);
app.use(profilRouter);
app.use(logoutRouter);

app.listen(3000, '0.0.0.0', () => {
    console.log("Server is running on port 3000");
});