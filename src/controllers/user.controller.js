import CustomerServices from "../services/customer.service.js";
import UserServices from "../services/user.service.js";
import { hashPassword } from "../utils/password.utils.js";
class UserController {
	static async getUser(req, res) {
		const user = await UserServices.getUser(req.session.userId);
		return res.status(200).send({ success: true, user });
	}

	static async updateOwn(req, res) {
		if (req.body.password) {
			delete req.body.password;
		}
		const updatedUser = await UserServices.updateUser(req.body, req.session.userId);
		return res
			.status(200)
			.send({ success: true, user: updatedUser, message: "اطلاعات شما تغییر کرد" });
	}

	static async updatePassword(req, res) {
		await UserServices.updatePassword(req.body, req.session.userId);
		return res.status(200).send({ success: true, message: "رمز عبور شما تغییر کرده" });
	}

	static async banUser(req, res) {
		await UserServices.banUser(req.params.id);
		return res.status(200).send({ success: true, message: "کارمند به حالت تعلیق در آمد" });
	}

	static async getAllActiveUsers(req, res) {
		const users = await UserServices.getUsersByFilter({
			status: "active",
			_id: { $ne: req.session.userId },
		});
		return res.status(200).send({ success: true, users });
	}

	static async getAllUsers(req, res) {
		const users = await UserServices.getUsersByFilter();
		return res.status(200).send({ success: true, users });
	}

	static async getOwnStats(req, res) {
		const results = await UserServices.getUserStats(req.session.userId);
		return res.status(200).send({ success: true, ...results });
	}

	static async getUserStats(req, res) {
		const results = await UserServices.getUserStats(req.params.id);
		return res.status(200).send({ success: true, ...results });
	}

	static async updateUser(req, res) {
		if (req.body.password) {
			req.body.password = hashPassword(req.body.password);
		}
		const updatedUser = await UserServices.updateUser(req.body, req.params.id);
		return res.status(200).send({ success: true, message: "اطلاعات کارمند تغییر کرد" });
	}

	static async createUser(req, res) {
		const user = await UserServices.createUser(req.body);
		return res.status(200).send({ success: true, user });
	}
}

export default UserController;
