import JobModel from "../models/Job.model.js"

class JobServices {
  static async getAllJobs() {
    const jobs = await JobModel.find()
    return jobs
  }

  static async createJob(jobData) {
    const job = await JobModel.create(jobData)
    return job
  }
}

export default JobServices