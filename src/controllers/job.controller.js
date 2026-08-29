import JobServices from "../services/job.service.js"

class JobController {
  static async getAllJobs(req, res) {
    const jobs = await JobServices.getAllJobs()
    return res.status(200).send({ success: true, jobs })
  }
}

export default JobController