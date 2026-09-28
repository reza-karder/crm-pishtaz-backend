import CallServices from "../services/call.service.js";

class CallController {
	static async updateCall(req, res) {
		const call = await CallServices.updateCall(req.params.id, req.body);
		return res.status(200).send({ success: true, call, message: "تماس با موفقیت به روزرسانی شد" });
	}

	static async deleteCall(req, res) {
		await CallServices.deleteCall(req.params.id);
		return res.status(200).send({ success: true, message: "تماس با موفقیت حذف شد" });
	}
}

export default CallController;
