import CallServices from "../services/call.service.js"

class CallController {
  static async getAllOwnCalls(req, res) {
    const calls = await CallServices.getAllOwnCalls(req.session.userId)
    return res.status(200).send({ success: true, calls })
  }

  static async getAllCalls(req, res) {
    const calls = await CallServices.getAllCalls()
    return res.status(200).send({ success: true, calls })
  }

  static async getSingleCall(req, res) {
    const call = await CallServices.getSingleCall(req.params.id)
    return res.status(200).send({ success: true, call })
  }

  static async createCall(req, res) {
    const call = await CallServices.createCall(req.body)
    res.status(200).send({ success: true, call })
  }

  static async updateCall(req, res) {
    const call = await CallServices.updateCall(req.params.id, req.body)
    return res.status(200).send({ success: true })
  }
}

export default CallController