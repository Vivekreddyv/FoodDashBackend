const mongoose=require('mongoose')
const mongodbURI=process.env.mongodbURI

const mongodb=async()=>{
    await mongoose.connect(mongodbURI)
    console.log('db connected')
}
module.exports=mongodb
