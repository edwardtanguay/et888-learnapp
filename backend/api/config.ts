import { IApiStatus } from '../../src/shared/interfaces';

export const getPort = () => {
	return 4206;
}

export const apiStatus = (): IApiStatus => {
	return {
		status: "live",
		whenLiveAgainDateTime: ""
	}
}