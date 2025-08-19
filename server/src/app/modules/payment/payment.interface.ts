import { Types } from "mongoose";

export enum EPAYMENT_STATUS {
	PAID = "PAID",
	UNPAID = "UNPAID",
	CANCELLED = "CANCELLED",
	FAILED = "FAILED",
	REFUND = "REFUND",
}

export interface IPayment {
	booking: Types.ObjectId;
	transactionId: string;
	amount: number;
	paymentGatewayData?: any;
	invoiceUrl?: string;
	status: EPAYMENT_STATUS;
}
