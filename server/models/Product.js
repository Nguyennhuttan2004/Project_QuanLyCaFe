const mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema({
    image: String,
    title : String,
    description: String,
    category: String,
    size: String,
    price: Number,
    salePrice: Number,
    totalStock: Number

},{timestamps: true})

module.exports = mongoose.model("Product",ProductSchema)