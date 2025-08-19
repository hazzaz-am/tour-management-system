import { model, Schema } from "mongoose";
import { EPAYMENT_STATUS, IPayment } from "./payment.interface";

const paymentSchema = new Schema<IPayment>(
	{
		booking: {
			type: Schema.Types.ObjectId,
			ref: "Booking",
			required: true,
			unique: true,
		},
		transactionId: {
			type: String,
			required: true,
			unique: true,
		},
		status: {
			type: String,
			enum: Object.values(EPAYMENT_STATUS),
			default: EPAYMENT_STATUS.UNPAID,
		},
		amount: {
			type: Number,
			required: true,
		},
		paymentGatewayData: {
			type: Schema.Types.Mixed,
		},
		invoiceUrl: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

export const Payment = model<IPayment>("Payment", paymentSchema);
