const express = require('express') //import express
const mongoose = require('mongoose') //import Mongoose
const cors = require('cors') //import cors
const ProductSchema = require('./Models/ProductSchema') //import model to define types
const app = express() //initilaze express
const PORT = process.env.PORT || 5000 //define server port

const SERVER_URI =  `mongodb+srv://YASEENADMIN:oeegobepllb@cluster0.zr5rg.mongodb.net/ecom` //mongodb connection uri

//make mongodb connection using mongoose
mongoose.connect(SERVER_URI)
.then((res)=>console.log('server Connceted')) //response catching
.catch((err)=>console.log(err)) //error catching


app.use(express.json()) //intilaize express in json
app.use(cors()) //intilaze cors because server or api use in react app

//make get request: make api trying to get all data in mongodb database
app.get('/ecom/allproducts', (req, res) => {
  ProductSchema.find({},(err,products)=>{
    if (err){
        res.json({
            message:'Something Wrong: Please Try Again'
        })
    }
    else{
        res.json({
            message:'SuccessFully: Opreation Successfull',
            products
        })
    }
  })
})

//make get request: make api trying to get only one data in mongodb database by id
app.get('/ecom/product/:id', (req, res,next) => {
    const {id} = req.params
    // console.log(id)
    const _id = id
  ProductSchema.findById(_id,(err,product)=>{
    if (err){
        res.json({
            message:'Something Wrong: Please Try Again'
        })
    }
    else{
        res.json({
            message:'SuccessFully: Opreation Successfull',
            product
        })
    }
  })
})

//make post request: make api trying to create data in mongodb database
app.post("/ecom/product", (req, res, next) => {
    console.log("body", req.body);
    const createProduct = req.body  
   ProductSchema.create(createProduct,(err,data)=>{
    if (err){
        res.json({
            message:'Something Wrong: Please Try Again'
        })
    }
    else{
        res.json({
            message:'SuccessFully: Opreation Successfull',
            data
        })
    }
   })
  });

  //make get request: make api trying to update data in mongodb database by _id
app.put('/ecom/product',(req,res)=>{
    console.log("body:",req.body)
    const {id} = req.body
    ProductSchema.findByIdAndUpdate(id,req.body.data,{ new: true },(err,updateProduct)=>{
        if (err) {
            res.json({
                message:'Something Wrong: Please Try Again'
            })
        }
        else{
            res.json({
                message:'SuccessFully: Opreation Successfull',
                updateProduct
            }) 
        }
    })
})

//make delete request: make api trying to delete data in mongodb database by _id
app.delete('/ecom/product',(req,res)=>{
    console.log("body:",req.body)
    const {id} = req.body
    ProductSchema.findByIdAndDelete(id,(err,data)=>{
        if (err) {
            res.json({
                message:'Something Wrong: Please Try Again'
            })
        }
        else{
            res.json({
                message:'SuccessFully: Opreation Successfull',
                data
            }) 
        }
    })
})


//listen the port to start the server
app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`)
})
