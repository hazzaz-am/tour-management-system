export interface ITourTypeResponse {
	statusCode: number;
	success: boolean;
	message: string;
	data: ITypeData;
}

export interface ITypeData {
	data: ITourType[];
	meta: ITypeMeta;
}

export interface ITourType {
	_id: string;
	name: string;
	createdAt: string;
	updatedAt: string;
}

export interface ITypeMeta {
	page: number;
	limit: number;
	total: number;
	totalPage: number;
}
