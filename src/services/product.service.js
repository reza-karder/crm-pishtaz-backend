import ProductModel from "../models/Product.model.js";

class ProductServices {
	static async getAllProducts() {
		const products = await ProductModel.find();
		return products;
	}

	static async createProduct(productData) {
		const product = await ProductModel.create(productData);
		return product;
	}

	static async updateProduct(productId, productData) {
		const product = await ProductModel.findByIdAndUpdate(productId, productData, {
			returnDocument: "after",
		});
    return product
	}

  static async deleteProduct(productId) {
    await ProductModel.findByIdAndDelete(productId)
  }
}

export default ProductServices;
