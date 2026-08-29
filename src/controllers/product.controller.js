import ProductServices from "../services/product.service.js"

class ProductController {
  static async getAllProducts(req, res) {
    const products = await ProductServices.getAllProducts()
    res.status(200).send({ success: true, products })
  } 
}

export default ProductController