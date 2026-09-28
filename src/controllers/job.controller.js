import JobServices from "../services/job.service.js";

class JobController {
	static async getAllJobs(req, res) {
		const jobs = await JobServices.getAllJobs();
		return res.status(200).send({ success: true, jobs });
	}

	static async createJob(req, res) {
		const job = await JobServices.createJob(req.body);
		return res.status(200).send({ success: true, job, message: "شغل با موفقیت اضافه شد" });
	}

	static async updateJob(req, res) {
		const job = await JobServices.updateJob(req.params.id, req.body);
		return res.status(200).send({ success: true, job, message: "شغل با موفقیت به روزرسانی شد" });
	}

	static async deleteJob(req, res) {
		await JobServices.deleteJob(req.params.id);
		return res.status(200).send({ success: true, message: "شغل با موفقیت حذف شد" });
	}

	static async getAdminJobs(req, res) {
		const result = await JobServices.getAdminJobs(req.query);
		return res.status(200).send({ success: true, ...result });
	}
}

export default JobController;
