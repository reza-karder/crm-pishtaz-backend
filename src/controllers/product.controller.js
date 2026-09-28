import ProductServices from "../services/product.service.js";

class ProductController {
	static async getAllProducts(req, res) {
		const products = await ProductServices.getAllProducts();
		res.status(200).send({ success: true, products });
	}

	static async getAdminProducts(req, res) {
		const result = await ProductServices.getAdminProducts(req.query);
		res.status(200).send({ succes: true, ...result });
	}

	static async createProduct(req, res) {
		const product = await ProductServices.createProduct(req.body);
		return res.status(200).send({ success: true, product, message: "محصول با موفقیت اضافه شد" });
	}

	static async updateProduct(req, res) {
		const product = await ProductServices.updateProduct(req.params.id, req.body);
		return res
			.status(200)
			.send({ success: true, product, message: "محصول با موفقیت به روزرسانی شد" });
	}

	static async deleteProduct(req, res) {
		await ProductServices.deleteProduct(req.params.id);
		return res.status(200).send({ success: true, message: "محصول با موفقیت حذف شد" });
	}
}

export default ProductController;
