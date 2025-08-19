export interface ISendOTP {
	email: string;
}

export interface IVerifyOTP {
	email: string;
	otp: string;
}

export interface ILogin {
	email: string;
	password: string;
}
