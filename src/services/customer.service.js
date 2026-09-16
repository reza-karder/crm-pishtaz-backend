import mongoose from "mongoose";
import CallModel from "../models/Call.model.js";
import CustomerModel from "../models/Customer.model.js";
import UserModel from "../models/User.model.js";
import ApiError from "../utils/ApiError.js";
import CallServices from "./call.service.js";

class CustomerServices {
	static async checkPhoneDuplication(phone, exceptionId) {
		const isPhoneDuplicated = await CustomerModel.exists({
			_id: { $ne: exceptionId },
			$or: [{ phonePrimary: phone }, { phoneSecondary: phone }],
		});
		return isPhoneDuplicated;
	}

	static async checkDuplications(customerData, exceptionId) {
		const { phonePrimary, phoneSecondary, email } = customerData;

		// check email unique
		if (email) {
			const isEmailDuplicated = await CustomerModel.exists({ email, _id: { $ne: exceptionId } });
			if (isEmailDuplicated) {
				throw ApiError.badRequest("این ایمیل از قبل وجود دارد");
			}
		}

		// check phonePrimary unique
		const isPhonePrimaryDuplicated = await this.checkPhoneDuplication(phonePrimary, exceptionId);
		if (isPhonePrimaryDuplicated) {
			throw ApiError.badRequest("شماره تماس اصلی از قبل وجود دارد");
		}

		// check phoneSecondary unique
		if (phoneSecondary) {
			const isPhoneSecondaryDuplicated = await this.checkPhoneDuplication(
				phoneSecondary,
				exceptionId
			);
			if (isPhoneSecondaryDuplicated) {
				throw ApiError.badRequest("شماره تماس دوم از قبل وجود دارد");
			}
		}
	}

	static async getAllCustomers() {
		const customers = await CustomerModel.find();
		return customers;
	}

	static async getAllOwnCustomers(employeeId) {
		const customers = await CustomerModel.find({ employee: employeeId });
		return customers;
	}

	static async getSingleCustomer(customerId) {
		const customers = await CustomerModel.findById(customerId).populate({ path: "calls" });
		return customers;
	}

	static async transferAllCustomers(originEmployeeId, destinationEmployeeId) {
		await CustomerModel.updateMany(
			{ employee: originEmployeeId },
			{ employee: destinationEmployeeId }
		);

		const originEmployee = await UserModel.findById(originEmployeeId);
		await UserModel.findByIdAndUpdate(destinationEmployeeId, {
			$push: { customers: originEmployee.customers },
		});
	}

	static async transferSingleCustomer(customerId, originEmployeeId, destinationEmployeeId) {
		await CustomerModel.findByIdAndUpdate(customerId, { employee: destinationEmployeeId });
		await UserModel.findByIdAndUpdate(originEmployeeId, { $pull: { customers: customerId } });
		await UserModel.findByIdAndUpdate(destinationEmployeeId, { $push: { customers: customerId } });
	}

	static async createCustomer(employeeId, customerData) {
		await this.checkDuplications(customerData);

		const customer = new CustomerModel(customerData);
		customer.employee = employeeId;

		const callsWithCustomerId = customerData.calls.map((call) => ({
			...call,
			customer: customer._id,
		}));
		const calls = await CallServices.createMany(callsWithCustomerId);
		customer.calls = calls;

		await customer.save();

		await UserModel.findByIdAndUpdate(employeeId, { $push: { customers: customer } });

		return customer;
	}

	static async updateCustomer(customerId, customerData) {
		console.log({ customerId, customerData });
		await this.checkDuplications(customerData, customerId);

		const callIds = [];
		const callOperations = customerData.calls.map((call) => {
			call._id = call._id || new mongoose.Types.ObjectId();
			callIds.push(call._id);

			return {
				updateOne: {
					filter: { _id: call._id },
					update: { $set: { ...call, customer: customerId } },
					upsert: true,
				},
			};
		});
		const callsResult = await CallModel.bulkWrite(callOperations);

		const customer = await CustomerModel.findByIdAndUpdate(
			customerId,
			{ ...customerData,  calls: callIds  },
			{ returnDocument: "after" }
		).populate({ path: "calls" });

		return customer;
	}

	static async deleteManyCustomers(customerIds) {
		await CustomerModel.deleteMany({ _id: { $in: customerIds } });
		await CallModel.deleteMany({ customerId: { $in: customerIds } });
		await UserModel.updateMany(
			{ customers: { $in: customerIds } },
			{ $pull: { customers: { $in: customerIds } } }
		);
	}
}

export default CustomerServices;
