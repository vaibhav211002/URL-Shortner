const express = require('express');
const app = express();
const connect = require('./connect');
connect();
const cors = require('cors');
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const urlRoute = require('./routes/url');
app.use('/url', urlRoute);
app.use('/api', urlRoute);
app.get('/api',urlRoute)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});