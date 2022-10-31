import {UserService} from "../UserService";
import {injectable} from "inversify";
import {AlertDto} from "../../../dtos/AlertDto";
import {IOCode} from "../../../common/IOCode";
import {IOMsg} from "../../../common/IOMsg";
import axios, {AxiosError} from "axios";
import {ResponseDto} from "../../../dtos/ResponseDto";
import {UserDto} from "../../../dtos/UserDto";
import AppConstants from "../../../common/AppConstants";

@injectable()
export class UserServiceImpl implements UserService{

	async register(userDto: UserDto): Promise<AlertDto> {
		try {

			const res = await axios.post<ResponseDto>(AppConstants.baseUrl+"user/register", {
				email: userDto.email,
				password: userDto.password
			});

			return Promise.resolve({
				code: res.data.code,
				title: res.data.code === IOCode.OK ? IOMsg.SUCCESS_HEAD : IOMsg.ERROR_HEAD,
				body: res.data.msg,
				status : res.data.code !== IOCode.OK
			});

		// @ts-ignore
		}catch (e:AxiosError) {
			return Promise.resolve({
				code: IOCode.ERROR,
				title: IOMsg.ERROR_HEAD,
				body: e.message,
				status : true
			});
		}
	}

}
