import CallModel from "../models/Call.model.js"

class CallServices {
  static async createMany(callsData) {
    const calls = await CallModel.insertMany(callsData)
    return calls
  }
}

export default CallServices