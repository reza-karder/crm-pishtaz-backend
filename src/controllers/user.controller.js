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
}

export default UserController;
