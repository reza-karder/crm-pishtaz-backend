import ProductModel from "../models/Product.model.js"

class ProductServices {
  static async getAllProducts() {
    const products = await ProductModel.find()
    return products
  }

  static async createProduct(productData) {
    const product = await ProductModel.create(productData)
    return product
  }
}

export default ProductServices