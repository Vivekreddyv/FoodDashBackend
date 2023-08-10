const mongoose=require('mongoose')
const mongodbURI='mongodb+srv://saivivek1414:FoodDash8797@cluster0.gbjbtgy.mongodb.net/FoodDashmern?retryWrites=true&w=majority'

const mongodb=async()=>{
    await mongoose.connect(mongodbURI)
    console.log('db connected')
}
module.exports=mongodb