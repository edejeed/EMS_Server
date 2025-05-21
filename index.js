import express from 'express'
import cors from 'cors'
import authRouter  from './routes/auth.js'
import employeeRouter from './routes/employee.js'
import connectDB from './db/db.js' 
import scheduleAnniversaryCheck from './middleware/salaryAlignment.js'

connectDB().then(() => {
    scheduleAnniversaryCheck();
  });

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/employee', employeeRouter) 

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
}) 