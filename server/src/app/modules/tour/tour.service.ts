import AppError from "../../error-helpers/app-error";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { TOURSEARCHABLEFIELDS } from "./tour.constants";
import { ITour, ITourType } from "./tour.interface";
import { Tour, TourType } from "./tour.model";
import httpStatus from "http-status-codes";

/**
 * Tour Services
 */

const getAllTours = async (query: Record<string, string>) => {
	const queryBuilder = new QueryBuilder(Tour.find(), query);
	const tours = await queryBuilder
		.search(TOURSEARCHABLEFIELDS)
		.filter()
		.sort()
		.fields()
		.paginate();

	const [data, meta] = await Promise.all([
		tours.build(),
		queryBuilder.getMeta(),
	]);

	return {
		data: data,
		meta: meta,
	};
};

const createTour = async (payload: ITour) => {
	const existingTour = await Tour.findOne({ title: payload.title });

	if (existingTour) {
		throw new AppError(
			httpStatus.BAD_REQUEST,
			"A tour with this title already exists"
		);
	}

	const tour = await Tour.create(payload);

	return tour;
};

const updateTour = async (id: string, payload: Partial<ITour>) => {
	const existingTour = await Tour.findById(id);

	if (!existingTour) {
		throw new AppError(httpStatus.BAD_REQUEST, "Tour not found");
	}

	const updatedTour = await Tour.findByIdAndUpdate(id, payload, {
		new: true,
	});

	return updatedTour;
};

const deleteTour = async (id: string) => {
	const existingTour = await Tour.findById(id);

	if (!existingTour) {
		throw new AppError(httpStatus.BAD_REQUEST, "Tour not found");
	}
	await Tour.findByIdAndDelete(id);
	return null;
};

/**
 * Tour Type Services
 */
const getAllTourTypes = async () => {
	return await TourType.find({});
};

const createTourType = async (payload: ITourType) => {
	const existingTourType = await TourType.findOne({ name: payload.name });
	if (existingTourType) {
		throw new AppError(
			httpStatus.BAD_REQUEST,
			"A tour type with this name already exists"
		);
	}
	const tourType = await TourType.create(payload);
	return tourType;
};

const updateTourType = async (id: string, payload: ITourType) => {
	const existingTourType = await TourType.findById(id);
	if (existingTourType) {
		throw new AppError(httpStatus.BAD_REQUEST, "Tour type not found");
	}
	const updatedTourType = await TourType.findByIdAndUpdate(id, payload, {
		new: true,
	});

	return updatedTourType;
};

const deleteTourType = async (id: string) => {
	const existingTourType = await TourType.findById(id);
	if (!existingTourType) {
		throw new AppError(httpStatus.BAD_REQUEST, "Tour type not found");
	}
	await TourType.findByIdAndDelete(id);
	return null;
};

export const TourServices = {
	getAllTours,
	createTour,
	updateTour,
	deleteTour,
	getAllTourTypes,
	createTourType,
	updateTourType,
	deleteTourType,
};
