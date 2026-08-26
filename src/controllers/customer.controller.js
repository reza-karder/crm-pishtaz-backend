import CustomerServices from "../services/customer.service.js";

class CustomerController {
	static async createCustomer(req, res) {
		const customer = await CustomerServices.createCustomer(req.body);
		return res.status(200).send({ success: true, customer });
	}

	static async updateCustomer(req, res) {
		const customer = await CustomerServices.updateCustomer(req.params.id, req.body);
		return res.status(200).send({ success: true, customer });
	}

	static async addPurchasedProduct(req, res) {
		const product = await CustomerServices.addProduct(req.body, "purchasedProducts", req.params.id);
		return res.status(200).send({ sucess: true, product });
	}

	static async addPotentialProduct(req, res) {
		const product = await CustomerServices.addProduct(req.body, "potentialProducts", req.params.id);
		return res.status(200).send({ sucess: true, product });
	}

	static async updatePurchasedProduct(req, res) {
		const { customerId, productId } = req.params;
		const product = await CustomerServices.updateProduct(
			req.body,
			"purchasedProducts",
			customerId,
			productId
		);
		return res.status(200).send({ sucess: true, product });
	}

	static async updatePotentialProduct(req, res) {
		const { customerId, productId } = req.params;
		const product = await CustomerServices.updateProduct(
			req.body,
			"potentialProducts",
			customerId,
			productId
		);
		return res.status(200).send({ sucess: true, product });
	}

	static async deletePurchasedProduct(req, res) {
		const { customerId, productId } = req.params;
		await CustomerServices.deleteProduct("purchasedProducts", customerId, productId);
		return res.status(200).send({ sucess: true });
	}

	static async deletePotentialProduct(req, res) {
		const { customerId, productId } = req.params;
		await CustomerServices.deleteProduct("potentialProducts", customerId, productId);
		return res.status(200).send({ sucess: true });
	}
}

export default CustomerController;
