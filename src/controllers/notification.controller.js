import NotificationServices from "../services/notification.service.js"

class NotificationController {
  static async getAllNotifications(req, res) {
    const notifications = await NotificationServices.getAllNotifications()
    return res.status(200).send({ sucess: true, notifications })
  }
}

export default NotificationController