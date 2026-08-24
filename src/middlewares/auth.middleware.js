import UserModel from '../models/User.model.js'
import ApiError from '../utils/ApiError.js'
import { catchAsync } from '../utils/errorHandler.js'

const requireAuthMiddleWare = catchAsync((req, res, next) => {
	if (!req.session.userId) {
		throw ApiError.unauthorized()
	}

	next()
})

const requireRoleMiddleWare = (role) => {
	return catchAsync(async (req, res, next) => {
		const user = await UserModel.findById(req.session.userId)

		if (user.role !== role) {
			throw ApiError.forbidden()
		}

		next()
	})
}

export { requireRoleMiddleWare, requireAuthMiddleWare }
