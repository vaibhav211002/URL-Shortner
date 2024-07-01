const express = require('express');
const app = express();
const connect = require('./connect');
connect();
const cors = require('cors');
app.use(cors(
    {
        origin: ['http://localhost:3000','https://url-shortner-sage-ten.vercel.app','https://url-shortner-1-ohrv.onrender.com'],
        methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
        credentials: true
    
    }
));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const urlRoute = require('./routes/url');
app.use('/url', urlRoute);
app.use('/api', urlRoute);
app.get('/api',urlRoute)

app.get('/',(req,res)=>{
    console.log('All Good');

})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});