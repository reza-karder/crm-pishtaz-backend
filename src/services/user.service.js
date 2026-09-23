import { populate } from "dotenv";
import CallModel from "../models/Call.model.js";
import UserModel from "../models/User.model.js";
import ApiError from "../utils/ApiError.js";
import { getCallsOfLast7Days, getScheduledCallsOfDay } from "../utils/date.utils.js";
import { hashPassword, verifyPassword } from "../utils/password.utils.js";
import CallServices from "./call.service.js";

class UserServices {
	static async checkDuplications(userData, exceptionId) {
		// check email unique
		const isEmailDuplicated = await UserModel.exists({
			email: userData.email,
			_id: { $ne: exceptionId },
		});
		if (isEmailDuplicated) {
			throw ApiError.badRequest("این ایمیل از قبل وجود دارد");
		}

		// check phone unique
		const isPhoneDuplicated = await UserModel.exists({
			phone: userData.phone,
			_id: { $ne: exceptionId },
		});
		if (isPhoneDuplicated) {
			throw ApiError.badRequest("این شماره موبایل از قبل وجود دارد");
		}
	}

	static async getUser(userId) {
		const user = await UserModel.findById(userId);
		return user;
	}

	static async updateUser(userUpdates, userId) {
		const user = await UserModel.findById(userId);

		await this.checkDuplications(userUpdates, userId);

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
    const user = await UserServices.getUser(userId)
		const calls = await CallServices.getAllOwnCalls(userId);

		const stats = {
			allCallsCount: getScheduledCallsOfDay(new Date(), calls).length,
			customersCount: user.customers.length,
			callsOfLast7Days: getCallsOfLast7Days(calls),
			todayCalls: getScheduledCallsOfDay(new Date(), calls),
		};

		return { stats, user };
	}

	static async createUser(userData) {
		await this.checkDuplications(userData);
		userData.password = hashPassword(userData.password);
		const user = await UserModel.create(userData);
		return user;
	}

	static async deleteUser(userId) {
		await UserModel.findByIdAndDelete(userId);
	}
}

export default UserServices;
