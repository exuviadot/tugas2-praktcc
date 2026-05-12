require('dotenv').config();

const express = require('express');
const sequelize = require('./config/database');
const noteRoutes = require('./routes/noteRoutes');

const app = express();
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
    res.redirect('/index.html');
});

app.use('/api/v1/notes', noteRoutes);

const port = process.env.PORT || 3000;
sequelize
    .sync()
    .then(() => {
        console.log('Database synced');
    })
    .catch((error) => {
        console.error('Error syncing database:', error);
    });

app.listen(port, () => {
        console.log(`Server running on port ${port}`);
});
