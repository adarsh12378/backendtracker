const express = require("express")
const cors = require('cors')
const cookies = require("cookie-parser")

const { logger } = require('./middlewares/logger.middleware')
const { errorHandler } = require('./middlewares/errorHandler.middleware')
// const corsOptions = require('./config/corsOptions')
const dbConnect = require("./db/db.config")
const authRouter = require("./routes/auth.routes")
const adminRouter = require("./routes/admin.routes")
const transactionRouter = require("./routes/transaction.routes")
const budgetRouter = require("./routes/budget.routes")
const recurringTransaction = require("./routes/recurringTransaction.routes")

const cron = require("node-cron")
const { createScheduledTransaction } = require("./utils/addScheduledTransaction.utils")

const app = express()
const corsOptions = {
    origin: ['https://frontendtracker.vercel.app'], // Only allow the frontend domain
    credentials: true, // Allow cookies and credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
    optionsSuccessStatus: 200 // Ensure successful OPTIONS requests
}

app.use(cors(corsOptions));

app.use(logger)

app.use(express.json(corsOptions))
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(cookies())

app.use('/auth', authRouter)
app.use('/admin', adminRouter)
app.use('/transactions', transactionRouter)
app.use('/budgets', budgetRouter)
app.use('/recurringTransactions', recurringTransaction)
app.get("/health", (req, res) => {
    res.send("Hello world")
})


try {
    cron.schedule('0 0 * * *', createScheduledTransaction, {
        scheduled: false,
    });
    
    setTimeout(() => {
        cron.schedule('0 0 * * *', createScheduledTransaction, {
            scheduled: true,
            timezone: 'Asia/Kolkata'
        });
    }, 1000)
} catch (error) {
    console.log(error);
}

app.use(errorHandler)
dbConnect()
const port = process.env.PORT 
app.listen(port, () => console.log(`Listening on http://localhost:${port}`))