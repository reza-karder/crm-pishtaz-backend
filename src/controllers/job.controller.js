import JobServices from "../services/job.service.js"

class JobController {
  static async getAllJobs(req, res) {
    const jobs = await JobServices.getAllJobs()
    return res.status(200).send({ success: true, jobs })
  }

  static async createJob(req, res) {
    const job = await JobServices.createJob(req.body)
    return res.status(200).send({ success: true, job })
  }

  static async updateJob(req, res) {
    const job = await JobServices.updateJob(req.params.id, req.body)
    return res.status(200).send({ success: true, job })
  }
}

export default JobController