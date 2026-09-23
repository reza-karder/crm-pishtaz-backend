import CustomerServices from "../services/customer.service.js";

class CustomerController {
  static async getAllCustomers(req, res) {
    const customers = await CustomerServices.getAllCustomers()
    return res.status(200).send({ success: true, customers })
  }

  static async getAllOwnCustomers(req, res) {
    const results = await CustomerServices.getAllOwnCustomers(req.session.userId, req.query)
    return res.status(200).send({ success: true, ...results })
  }

  static async getSingleCustomer(req, res) {
    const customer = await CustomerServices.getSingleCustomer(req.session.userId, req.params.id)
    return res.status(200).send({ success: true, customer })
  }

	static async createCustomer(req, res) {
		const customer = await CustomerServices.createCustomer(req.session.userId, req.body);
		return res.status(200).send({ success: true, customer, message: "مشتری با موفقیت اضافه  شد" });
	}

	static async updateCustomer(req, res) {
		const customer = await CustomerServices.updateCustomer(req.params.id, req.body);
		return res.status(200).send({ success: true, customer, message: "اطلاعات مشتری با موفقیت تغییر کرد" });
	}

  static async deleteSingleCustomer(req, res) {
    await CustomerServices.deleteSingleCustomer(req.params.id)
    return res.status(200).send({ success: true,  message: "مشتری با موفقیت حذف شدند" })
  }

  static async deleteManyCustomers(req, res) {
    await CustomerServices.deleteManyCustomers(req.session.userId, req.body)
    return res.status(200).send({ success: true, message: "مشتریان با موفقیت حذف شدند" })
  }

  static async transferSingleCustomer(req, res) {
    const { destinationEmployeeId, customerId } = req.body
    await CustomerServices.transferSingleCustomer(customerId, req.session.userId, destinationEmployeeId)
    return res.status(200).send({ success: true })
  }

  static async toggleCustomerStatus(req, res) {
    const status = await CustomerServices.toggleCustomerStatus(req.params.id)
    return res.status(200).send({ success: true, status })
  }
}

export default CustomerController;
