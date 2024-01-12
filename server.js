const express = require('express');
const cors = require('cors');
require('dotenv').config();
const membersRoutes = require('./members.routes');
const usersRoutes = require('./users.routes');
const initdb = require('./initdb')
const swaggerUi = require('swagger-ui-express');
const apiDoc = require('./apiDoc');

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());
app.use('/init', initdb)
app.use('/members', membersRoutes);
app.use('/users', usersRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDoc));

app.listen(PORT, (error) => {
    if(error) {
        console.log('error! ', error)
    } else {
        console.log(`server running on port ${PORT} ...`)
    }
})