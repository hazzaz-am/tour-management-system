import z from "zod";

export const createTourZodSchema = z.object({
	title: z.string().min(1),
	description: z.string().optional(),
	location: z.string().optional(),
	costFrom: z.number().optional(),
	startDate: z.string().optional(),
	endDate: z.string().optional(),
	tourType: z.string(),
	maxGuest: z.number().optional(),
	minAge: z.number().optional(),
	division: z.string(),
	included: z.array(z.string()).optional(),
	excluded: z.array(z.string()).optional(),
	amenities: z.array(z.string()).optional(),
	tourPlan: z.array(z.string()).optional(),
	departureLocation: z.string().optional(),
	arrivalLocation: z.string().optional(),
});

export const updateTourZodSchema = z.object({
	title: z.string().optional(),
	description: z.string().optional(),
	location: z.string().optional(),
	costFrom: z.number().optional(),
	startDate: z.string().optional(),
	endDate: z.string().optional(),
	tourType: z.string().optional(),
	maxGuest: z.number().optional(),
	minAge: z.number().optional(),
	division: z.string(),
	included: z.array(z.string()).optional(),
	excluded: z.array(z.string()).optional(),
	amenities: z.array(z.string()).optional(),
	tourPlan: z.array(z.string()).optional(),
	departureLocation: z.string().optional(),
	arrivalLocation: z.string().optional(),
});

export const createTourTypeZodSchema = z.object({
	name: z.string(),
});
