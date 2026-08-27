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
}

export default CallController