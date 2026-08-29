import JobModel from "../models/Job.model.js"

class JobServices {
  static async getAllJobs() {
    const jobs = await JobModel.find()
    return jobs
  }
}

export default JobServices