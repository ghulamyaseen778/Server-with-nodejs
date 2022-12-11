const mongoose = require('mongoose') //import mongoose
const Schema = mongoose.Schema({ //make mongoose schema
    title:{
        type:String //define title type
    },
    desc:{
        type:String //define decription type
    },
    price:{
        type:Number //define price type
    }
})

const ProductSchema = mongoose.model('product',Schema) //make mongoose schema model 
module.exports = ProductSchema; //export mongoose schema