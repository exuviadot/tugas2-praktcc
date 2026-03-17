const express = require('express');
const path = require('path');
const sequelize = require('./config/database');
const noteRoutes = require('./routes/noteRoutes');

const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'frontend'), {
    index: 'index.html'
}));

// app.get('/api', (req, res) => {
//     res.send('Hello World!');
// });

require('./schema/Notes');
app.use('/api/v1/notes', noteRoutes);

const port = process.env.PORT || 3000;
sequelize.sync().then(() => {
    console.log('Database synced');
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});