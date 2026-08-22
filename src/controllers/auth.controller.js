import AuthServices from "../services/auth.service.js";

class AuthController {
	static async signin(req, res) {
		const user = await AuthServices.authenticateUser(req, res);

		req.session.userId = user._id;

		return res.status(200).send({ success: true, message: "وارد حساب کاربری خود شدید" });
	}
}

export default AuthController;