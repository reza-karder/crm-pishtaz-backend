import ProductServices from "../services/product.service.js"

class ProductController {
  static async getAllProducts(req, res) {
    const products = await ProductServices.getAllProducts()
    res.status(200).send({ success: true, products })
  } 

  static async createProduct(req, res) {
    const product = await ProductServices.createProduct(req.body)
    return res.status(200).send({ success: true, product })
  }
}

export default ProductController