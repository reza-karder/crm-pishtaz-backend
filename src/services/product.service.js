import ProductModel from "../models/Product.model.js";

class ProductServices {
	static async getAllProducts() {
		const products = await ProductModel.find();
		return products;
	}

	static async getAdminProducts(queries) {
		const search = queries.search || "";

		const page = Number(queries.page) || 1;
		const limit = 15;
		const skip = (page - 1) * limit;

		const options = { title: { $regex: search, $options: "i" } };
		const [products, totalProducts] = await Promise.all([
			ProductModel.find(options).limit(limit).skip(skip),
			ProductModel.countDocuments(options),
		]);

		return { products, totalProducts, totalPages: Math.ceil(totalProducts / limit), limit };
	}

	static async createProduct(productData) {
		const product = await ProductModel.create(productData);
		return product;
	}

	static async updateProduct(productId, productData) {
		const product = await ProductModel.findByIdAndUpdate(productId, productData, {
			returnDocument: "after",
		});
		return product;
	}

	static async deleteProduct(productId) {
		await ProductModel.findByIdAndDelete(productId);
	}
}

export default ProductServices;
