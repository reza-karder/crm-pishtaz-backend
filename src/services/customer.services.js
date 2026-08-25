import CustomerModel from "../models/Customer.model.js";
import UserModel from "../models/User.model.js";

class CustomerServices {
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
}

export default CustomerServices;
