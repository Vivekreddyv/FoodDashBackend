const express=require('express')
const app=express()
const port=5000
const cors=require('cors')
const mongodb=require('./database.js')
mongodb()

app.use(cors())
app.use(express.json())
app.use('/api',require('./routes/createuser.js'))
app.use('/api',require('./routes/loginuser.js'))

app.get('/',(req,res)=>{
    res.send('hii')
})

app.listen(port,()=>{
    console.log(`server is listening to ${port}`)
})