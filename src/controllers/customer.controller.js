import CustomerServices from "../services/customer.service.js"

class CustomerController {
  static async createCustomer(req, res) {
    const customer = await CustomerServices.createCustomer(req.body)
    return res.status(200).send({ success: true, customer })
  }

  static async updateCustomer(req, res) {
    const customer = await CustomerServices.updateCustomer(req.params.id, req.body)
    return res.status(200).send({ success: true, customer })
  }
}

export default CustomerController