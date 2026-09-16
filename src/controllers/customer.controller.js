import CustomerServices from "../services/customer.service.js";

class CustomerController {
  static async getAllCustomers(req, res) {
    const customers = await CustomerServices.getAllCustomers()
    return res.status(200).send({ success: true, customers })
  }

  static async getAllOwnCustomers(req, res) {
    const customers = await CustomerServices.getAllOwnCustomers(req.session.userId)
    return res.status(200).send({ success: true, customers })
  }

  static async getSingleCustomer(req, res) {
    const customer = await CustomerServices.getSingleCustomer(req.params.id)
    return res.status(200).send({ success: true, customer })
  }

	static async createCustomer(req, res) {
		const customer = await CustomerServices.createCustomer(req.session.userId, req.body);
		return res.status(200).send({ success: true, customer });
	}

	static async updateCustomer(req, res) {
		const customer = await CustomerServices.updateCustomer(req.params.id, req.body);
		return res.status(200).send({ success: true, customer });
	}

  static async deleteSingleCustomer(req, res) {
    await CustomerServices.deleteManyCustomers([req.params.id])
    return res.status(200).send({ success: true })
  }

  static async deleteManyCustomers(req, res) {
    await CustomerServices.deleteManyCustomers(req.body.customerIds)
    return res.status(200).send({ success: true })
  }

  static async transferSingleCustomer(req, res) {
    const { destinationEmployeeId, customerId } = req.body
    await CustomerServices.transferSingleCustomer(customerId, req.session.userId, destinationEmployeeId)
    return res.status(200).send({ success: true })
  }
}

export default CustomerController;
