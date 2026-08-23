import UserServices from "../services/user.service.js"
class UserController {
  static async updateUser(req, res) {
    const updatedUser = await UserServices.updateUser(req, res, req.session.userId)
    return res.status(200).send({ success: true, user: updatedUser })
  }
}

export default UserController