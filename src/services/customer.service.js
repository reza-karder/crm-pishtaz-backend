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
		const isEmailDuplicated = await CustomerModel.exists({ email, _id: { $ne: exceptionId } });
		if (isEmailDuplicated) {
			throw ApiError.badRequest("این ایمیل از قبل وجود دارد");
		}

		// check phonePrimary unique
		const isPhonePrimaryDuplicated = await this.checkPhoneDuplication(phonePrimary, exceptionId);
		if (isPhonePrimaryDuplicated) {
			throw ApiError.badRequest("شماره تماس اصلی از قبل وجود دارد");
		}

		// check phoneSecondary unique
		const isPhoneSecondaryDuplicated = await this.checkPhoneDuplication(phoneSecondary, exceptionId);
		if (isPhoneSecondaryDuplicated) {
			throw ApiError.badRequest("شماره تماس دوم از قبل وجود دارد");
		}
	}

	static async transferAllOwnerShips(originEmployeeId, destinationEmployeeId) {
		await CustomerModel.updateMany(
			{ employee: originEmployeeId },
			{ employee: destinationEmployeeId }
		);

		const originEmployee = await UserModel.findById(originEmployeeId);
		await UserModel.findByIdAndUpdate(destinationEmployeeId, {
			$push: { customers: originEmployee.customers },
		});
	}

	static async createCustomer(customerData) {
		await this.checkDuplications(customerData);
		const customer = new CustomerModel(customerData);

		const callsWithCustomerId = customerData.calls.map((call) => ({
			...call,
			customer: customer._id,
		}));
		const calls = await CallServices.createMany(callsWithCustomerId);
		customer.calls = calls;

		await customer.save();
    return customer
	}

  static async updateCustomer(customerId, customerData) {
    await this.checkDuplications(customerData, customerId)
    const customer = await CustomerModel.findByIdAndUpdate(customerId, customerData, { returnDocument: "after" })
    return customer
  }
}

export default CustomerServices;
