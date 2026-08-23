import UserModel from "../models/User.model.js";

class UserServices {
	static async updateUser(req, res, id) {
		const { body } = req;
		const user = await UserModel.findById(id);

		// check email unique
		const isEmailDuplicated = await UserModel.exists({ email: body.email });
		if (isEmailDuplicated && body.email !== user.email) {
			return res.status(400).send({ success: false, message: "این ایمیل از قبل وجود دارد" });
		}

		// check phone unique
		const isPhoneDuplicated = await UserModel.exists({ phone: body.phone });
		if (isPhoneDuplicated && body.phone !== user.phone) {
			return res.status(400).send({ success: false, message: "این شماره موبایل از قبل وجود دارد" });
		}

		const updatedUser = await UserModel.findByIdAndUpdate(id, body, { returnDocument: "after" });

		return updatedUser;
	}
}

export default UserServices;
