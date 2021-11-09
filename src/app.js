const express = require('express')
const cors = require('cors')
const env = require('dotenv')
const mongoose = require('mongoose')
const morgan = require('morgan')
const helmet = require('helmet')
const handleError = require('./utils/HandleError')
const UserRoute = require('./routers/UserRoute')
const TicketRoute = require('./routers/TicketRoute')

env.config();
const app = express()
app.use(express.json());
app.use(cors())
const port = process.env.PORT || 3001

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/ticket', {
    useNewUrlParser: true,
    useUnifiedTopology: true,

});
if (process.env.NODE_ENV !== 'production') {
    const moB = mongoose.connection;
    moB.on("open", () => {
        console.log('database connected')
    });

    moB.on("error", (error) => {
        console.log(error)
    });
    app.use(morgan('tiny'));
}

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use('/v1/user', UserRoute);
app.use('/v1/ticket', TicketRoute);
app.use((req, res, next) => {
    const error = new Error("resource not found");
    error.status = 400;
    next(error)

});
app.use((error, req, res, next) => {
    handleError(error, res)
});


app.listen(port, () => {
    console.log(`API is running on http://localhost:${port}`);
})