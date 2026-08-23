import AuthServices from "../services/auth.service.js";
import ApiError from "../utils/ApiError.js";

class AuthController {
	static async signin(req, res) {
		const user = await AuthServices.authenticateUser(req, res);

		req.session.userId = user._id;

		return res.status(200).send({ success: true, message: "وارد حساب کاربری خود شدید" });
	}

  static async signout(req, res) {
    req.session.destroy(error => {
      if(error) {
        throw ApiError.serverError()
      }
      
      res.clearCookie("connect.sid")
      return res.status(200).send({ success: true, message: "از حساب کاربری خود خارج شدید" })
    })
  }
}

export default AuthController;