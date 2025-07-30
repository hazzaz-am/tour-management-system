import AppError from "../../error-helpers/app-error";
import { IDivision } from "./division.interface";
import { Division } from "./division.model";
import httpStatus from "http-status-codes";

const createDivision = async (payload: IDivision) => {
	const existingDivision = await Division.findOne({ name: payload.name });

	if (existingDivision) {
		throw new AppError(
			httpStatus.BAD_REQUEST,
			"A Division with this name already exists"
		);
	}

	const division = await Division.create(payload);
	return division;
};

const getAllDivision = async () => {
	const divisions = await Division.find({});
	const totalDivisions = await Division.countDocuments();

	return {
		data: divisions,
		meta: {
			total: totalDivisions,
		},
	};
};

const getSingleDivision = async (slug: string) => {
	const division = await Division.find({ slug });

	return {
		data: division,
	};
};

const updateDivision = async (id: string, payload: Partial<IDivision>) => {
	const existingDivision = await Division.findById(id);

	if (!existingDivision) {
		throw new AppError(httpStatus.BAD_REQUEST, "Division not found");
	}

	const duplicateDivision = await Division.findOne({
		name: payload.name,
		_id: { $ne: id },
	});

	if (duplicateDivision) {
		throw new AppError(
			httpStatus.BAD_REQUEST,
			"A division with this name already exists."
		);
	}

	const updatedDivision = await Division.findByIdAndUpdate(id, payload, {
		new: true,
		runValidators: true,
	});

	return updatedDivision;
};

const deleteDivision = async (id: string) => {
	await Division.findByIdAndDelete(id);
	return null;
};

export const DivisionServices = {
	createDivision,
	getAllDivision,
	getSingleDivision,
	updateDivision,
	deleteDivision,
};
