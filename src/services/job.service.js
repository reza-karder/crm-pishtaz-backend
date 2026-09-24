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

	static async deleteJob(jobId) {
		await JobModel.findByIdAndDelete(jobId);
	}

	static async getAdminJobs(queries) {
		const search = queries.search || "";

		const page = Number(queries.page) || 1;
		const limit = 15;
		const skip = (page - 1) * limit;

		const options = { title: { $ne: "سایر", $regex: search, $options: "i" } };
		const [jobs, totalJobs] = await Promise.all([
			JobModel.find(options).limit(limit).skip(skip),
			JobModel.countDocuments(options),
		]);

		return { jobs, totalJobs, totalPages: Math.ceil(totalJobs / limit), limit };
	}
}

export default JobServices;
