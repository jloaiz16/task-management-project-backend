const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./app/models');

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync({ force: true }).then(
    () => {
        console.log('Drop and re-sync database');
    }
);

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to REST API of task manager app'
    });
});

app.routes = require('./app/routes/task.routes')(app);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server is running on port: ', PORT);
});