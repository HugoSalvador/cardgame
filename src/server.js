require('express-async-errors');
require('dotenv').config();
const AppError = require('./utils/AppError');

const express = require('express');
const cron = require("node-cron");

const routes = require('./routes');

const app = express();


app.use(express.json());
cron.schedule("* * * * *", () => console.log("Executando a tarefa a cada 1 minuto"));

app.use(routes);


app.use((error, req, res, next) => {
    if(error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: 'error',
            message: error.message
        })
    }

    console.log(error);

    return res.status(500).json({
        status: 'Error',
        message: 'Internal server error'
    })
});


const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))