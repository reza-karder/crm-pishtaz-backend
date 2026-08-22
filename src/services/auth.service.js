import UserModel from "../models/User.model.js";
import ApiError from "../utils/ApiError.js";
import { verifyPassword } from "../utils/password.utils.js";

class AuthServices {
	static async authenticateUser(req, res) {
		const { email, password } = req.body;
		const user = await UserModel.findOne({ email });

		if (!user) {
			throw ApiError.unauthorized("ایمیل یا رمز عبور اشتباه می باشد");
		}

		const isValid = verifyPassword(password, user.password);
		if (!isValid) {
			throw ApiError.unauthorized("ایمیل یا رمز عبور اشتباه می باشد");
		}

		return user;
	}
}

export default AuthServices;
