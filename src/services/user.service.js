import CallModel from "../models/Call.model.js";
import UserModel from "../models/User.model.js";
import ApiError from "../utils/ApiError.js";
import { getCallsOfLast6Days, getScheduledCallsOfDay } from "../utils/date.utils.js";
import { hashPassword, verifyPassword } from "../utils/password.utils.js";

class UserServices {
	static async updateUser(userUpdates, userId) {
		const user = await UserModel.findById(userId);

		// check email unique
		const isEmailDuplicated = await UserModel.exists({ email: userUpdates.email });
		if (isEmailDuplicated && userUpdates.email !== user.email) {
			throw ApiError.badRequest("این ایمیل از قبل وجود دارد");
		}

		// check phone unique
		const isPhoneDuplicated = await UserModel.exists({ phone: userUpdates.phone });
		if (isPhoneDuplicated && userUpdates.phone !== user.phone) {
			throw ApiError.badRequest("این شماره موبایل از قبل وجود دارد");
		}

		const updatedUser = await UserModel.findByIdAndUpdate(userId, userUpdates, {
			returnDocument: "after",
		});

		return updatedUser;
	}

	static async updatePassword(passwords, userId) {
		const { currentPassword, newPassword } = passwords;
		const user = await UserModel.findById(userId);

		if (!verifyPassword(currentPassword, user.password)) {
			throw ApiError.badRequest("رمز عبور فعلی صحیح نمی باشد");
		}

		if (verifyPassword(newPassword, user.password)) {
			throw ApiError.badRequest("رمز عبور جدید نمی تواند با فعلی برابر باشد");
		}

		const hashedPassword = hashPassword(newPassword);
		user.password = hashedPassword;
		await user.save();
	}

	static async banUser(userId) {
		await UserModel.findByIdAndUpdate(userId, { status: "ban" });
	}

	static async getUsersByFilter(filters) {
		const users = await UserModel.find(filters);
		return users;
	}

	static async getUserStats(userId) {
		const user = await UserModel.findById(userId).populate();
		const calls = await CallModel.find({ employee: userId }).populate({
			path: "customer",
			select: ["name"],
		});

		const stats = {
			allCallsCount: calls.length,
			customersCount: user.customers.length,
			callsOfWeek: getCallsOfLast6Days(calls),
			todayCalls: getScheduledCallsOfDay(new Date(), calls),
		};

		return stats;
	}
}

export default UserServices;
