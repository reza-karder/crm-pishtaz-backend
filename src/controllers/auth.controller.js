import AuthServices from "../services/auth.service.js";
import UserServices from "../services/user.service.js";
import ApiError from "../utils/ApiError.js";

class AuthController {
	static async signin(req, res) {
		const user = await AuthServices.authenticateUser(req, res);

		req.session.userId = user._id;

		return res.status(200).send({ success: true, message: "وارد حساب کاربری خود شدید", user });
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

  static async checkSession(req, res) {
    const user = await UserServices.getUser(req.session?.userId)

    if(!user) {
      throw ApiError.unauthorized("شما وارد حساب کاربری خود نشدید")
    }

    res.status(200).send({ success: true, message: "شما در حساب کاربری خود هستید", user })
  }
}

export default AuthController;