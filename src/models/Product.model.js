import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  price: { type: Number }
}, { timestamps: true })

const ProductModel = mongoose.model("Product", ProductSchema)

export default ProductModel