import JobModel from "../models/Job.model.js";

class JobServices {
	static async getAllJobs() {
		const jobs = await JobModel.find();
		return jobs;
	}

	static async createJob(jobData) {
		const job = await JobModel.create(jobData);
		return job;
	}

	static async updateJob(jobId, jobData) {
		const job = await JobModel.findByIdAndUpdate(jobId, jobData, { returnDocument: "after" });
		return job;
	}
}

export default JobServices;
