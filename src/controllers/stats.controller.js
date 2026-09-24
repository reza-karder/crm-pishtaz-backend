import StatsServices from "../services/stats.service.js"

class StatsController {
  static async getStats(req, res) {
    const result = await StatsServices.getStats()
    return res.status(200).send({ success: true, ...result })
  }
}

export default StatsController