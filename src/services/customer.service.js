import mongoose from "mongoose";
import CallModel from "../models/Call.model.js";
import CustomerModel from "../models/Customer.model.js";
import UserModel from "../models/User.model.js";
import ApiError from "../utils/ApiError.js";
import CallServices from "./call.service.js";
import {
	createCallOption,
	createFilterOptions,
	createSortOption,
	removeDefaultFields,
} from "../utils/customer.utils.js";
import ProductModel from "../models/Product.model.js";

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

		if (phonePrimary === phoneSecondary) {
			throw ApiError.badRequest("شماره تماس اصلی نمی تواند با شماره تماس دوم برابر باشد");
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

	static async getAllOwnCustomers(employeeId, queries) {
		// create filter options
		const cleanedQueries = removeDefaultFields(queries);
		const filterOptions = createFilterOptions(cleanedQueries);
		const sortOption = createSortOption(cleanedQueries.sort);

		// handle page filter
		const page = Number(cleanedQueries.page) || 1;
		const limit = 15;
		const skip = (page - 1) * limit;

		// handle call filter
		let customerWithCallsIds = [];
		if (cleanedQueries.call) {
			customerWithCallsIds = await CallModel.distinct("customer", { status: "scheduled" });
		}
		const callOption = createCallOption(cleanedQueries.call, customerWithCallsIds);

		// get data with filters
		const findOptions = { employee: employeeId, ...filterOptions, ...callOption };
		const [customers, totalCustomers] = await Promise.all([
			CustomerModel.find(findOptions)
				.sort(sortOption)
				.skip(skip)
				.limit(limit)
				.populate({ path: "job" }),
			CustomerModel.countDocuments(findOptions),
		]);

		return { customers, totalPages: Math.ceil(totalCustomers / limit), totalCustomers, limit };
	}

	static async getSingleCustomer(customerId) {
		const customers = await CustomerModel.findById(customerId)
			.populate({ path: "calls" })
			.populate({ path: "job" })
			.populate({ path: "products.product" });
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
			{ ...customerData, calls: callIds },
			{ returnDocument: "after" }
		)
			.populate({ path: "calls" })
			.populate({ path: "job" })
			.populate({ path: "products.product" });

		return customer;
	}

	static async deleteManyCustomers(employeeId, selection) {
		let customerIdsToDelete = [];

		if (selection.mode === "all") {
			const allCustomerIds = await CustomerModel.find({ employee: employeeId }).distinct("_id");
			customerIdsToDelete = allCustomerIds.filter(
				(customerId) => !selection.excludedIds.includes(String(customerId))
			);
		}

		if (selection.mode === "explicit") {
			customerIdsToDelete = selection.selectedIds;
		}

		await CustomerModel.deleteMany({ _id: { $in: customerIdsToDelete } });
		await CallModel.deleteMany({ customer: { $in: customerIdsToDelete } });
		await UserModel.updateMany(
			{ customers: { $in: customerIdsToDelete } },
			{ $pull: { customers: { $in: customerIdsToDelete } } }
		);
	}

  static async deleteSingleCustomer(customerId) {
    await CustomerModel.findByIdAndDelete(customerId);
		await CallModel.deleteMany({ customer: customerId });
		await UserModel.updateMany(
			{ customers: customerId },
			{ $pull: { customers: customerId } }
		);
  }
}

export default CustomerServices;
