import UserModel from "../models/User.model.js";
import ApiError from "../utils/ApiError.js";
import { hashPassword, verifyPassword } from "../utils/password.utils.js";

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

  static async updatePassword(req, id) {
    const { currentPassword, newPassword } = req.body
    const user = await UserModel.findById(id)

    if(!verifyPassword(currentPassword, user.password)) {
      throw ApiError.badRequest("رمز عبور فعلی صحیح نمی باشد")
    }

    if(verifyPassword(newPassword, user.password)) {
      throw ApiError.badRequest("رمز عبور جدید نمی تواند با فعلی برابر باشد")
    }

    const hashedPassword = hashPassword(newPassword)
    user.password = hashedPassword
    await user.save()
  }
}

export default UserServices;
