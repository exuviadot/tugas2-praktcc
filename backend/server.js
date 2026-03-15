const express = require('express');
const sequelize = require('./config/database');
const noteRoutes = require('./routes/noteRoutes');

const app = express();
const cors = require('cors');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Test test hehe!');
});

require('./schema/Notes');
app.use('/api/v1/notes', noteRoutes);

const port = process.env.PORT || 3000;
sequelize.sync().then(() => {
    console.log('Database synced');
    app.listen(port, () => console.log(`Server running on port ${port}`));
});