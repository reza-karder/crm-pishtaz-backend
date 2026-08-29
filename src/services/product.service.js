import ProductModel from "../models/Product.model.js"

class ProductServices {
  static async getAllProducts() {
    const products = await ProductModel.find()
    return products
  }
}

export default ProductServices