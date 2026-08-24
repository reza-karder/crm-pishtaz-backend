import UserServices from "../services/user.service.js";
class UserController {
	static async updateUser(req, res) {
		const updatedUser = await UserServices.updateUser(req.body, req.session.userId);
		return res.status(200).send({ success: true, user: updatedUser, message: "اطلاعات شما تغییر کرد" });
	}

	static async updatePassword(req, res) {
		await UserServices.updatePassword(req.body, req.session.userId);
		return res.status(200).send({ success: true, message: "رمز عبور شما تغییر کرده" });
	}

  static async banUser(req, res) {
    await UserServices.banUser(req.params.id)
    return res.status(200).send({ success: true, message: "کارمند به حالت تعلیق در آمد" })
  }

  static async getAllActiveUsers(req, res) {
    const users = await UserServices.getUsersByFilter({ status: "active" })
    return res.status(200).send({ success: true, users })
  }

  static async getAllUsers(req, res) {
    const users = await UserServices.getUsersByFilter()
    return res.status(200).send({ success: true, users })
  }
}

export default UserController;
