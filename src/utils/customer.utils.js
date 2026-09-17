const DATE_OPTION_DAYS = {
	"24h": 1,
	week: 7,
	month: 30,
};

const SORT_OPTION_MAPS = {
	newest: { createdAt: 1 },
	oldest: { createdAt: -1 },
	name: { name: 1 },
};

function removeDefaultFields(queries) {
	const cleanedQueries = { ...queries };

	for (const query in cleanedQueries) {
		const value = cleanedQueries[query];

		if (!value || value === "all") {
			delete cleanedQueries[query];
		}
	}

	return cleanedQueries;
}

function createFilterOptions(queries) {
	const options = { $and: [] };
	const { date, search, purchasedProduct, call, potentialProduct, status, job } = queries;

	// filters like purchasedProducts, job, status, ...
	if (job) {
		options.job = job;
	}

	if (status) {
		options.status = status;
	}

	if (purchasedProduct) {
		options.$and.push({
			products: {
				$elemMatch: {
					product: purchasedProduct,
					type: "purchased",
				},
			},
		});
	}

	if (potentialProduct) {
		options.$and.push({
			products: {
				$elemMatch: {
					product: potentialProduct,
					type: "potential",
				},
			},
		});
	}

	if (date) {
		const minDate = new Date();
		minDate.setDate(minDate.getDate() - DATE_OPTION_DAYS[date]);

		options.createdAt = { $gte: minDate };
	}

	if (search) {
		options.$or.push(
			{ name: { $regex: search, $options: "i" } },
			{ email: { $regex: search, $options: "i" } },
			{ phonePrimary: { $regex: search, $options: "i" } },
			{ phoneSecondary: { $regex: search, $options: "i" } }
		);
	}

	return options;
}

function createSortOption(sort) {
	let options = {};

	if (sort) {
		options = SORT_OPTION_MAPS[sort];
	}

	return options;
}

function createCallOption(call, customerIds) {
	let option = {};

	if (call === "scheduled") {
		option = { _id: { $in: customerIds } };
	}

	if (call === "none") {
		option = { _id: { $nin: customerIds } };
	}

	return option;
}

export { removeDefaultFields, createFilterOptions, createSortOption, createCallOption };
