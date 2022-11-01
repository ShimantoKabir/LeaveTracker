import { UserService} from "../UserService";
import {inject, injectable} from "inversify";
import {AlertDto} from "../../../dtos/AlertDto";
import {IOCode} from "../../../common/IOCode";
import {IOMsg} from "../../../common/IOMsg";
import axios, {AxiosError} from "axios";
import {ResponseDto} from "../../../dtos/ResponseDto";
import {UserDto} from "../../../dtos/UserDto";
import AppConstants from "../../../common/AppConstants";
import {UDB, UserDtoBuilder} from "../../../dtos/builders/UserDtoBuilder";

@injectable()
export class UserServiceImpl implements UserService{

	@inject(UDB)
	private readonly userDtoBuilder!: UserDtoBuilder;

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
		}catch (e: AxiosError) {
			return Promise.resolve({
				code: IOCode.ERROR,
				title: IOMsg.ERROR_HEAD,
				body: e.message,
				status : true
			});
		}
	}

	async login(userDto: UserDto): Promise<UserDto> {

		try {
			const res = await axios.post<ResponseDto>(AppConstants.baseUrl+"auth/login", {
				email: userDto.email,
				password: userDto.password
			});

			const userDtoBuilder: UserDtoBuilder = this.userDtoBuilder
				.withMsg(res.data.msg)
				.withCode(res.data.code)

			if (res.data.code === IOCode.OK){
				userDtoBuilder.withAuthToken(res.data.authToken);
				userDtoBuilder.withRefreshToken(res.data.refreshToken)
			}

			return Promise.resolve(userDtoBuilder.build());

		// @ts-ignore
		}catch (e: AxiosError) {
			const user = this.userDtoBuilder.withMsg(e.message)
				.withCode(IOCode.ERROR)
				.build();
			return Promise.resolve(user);
		}
	}

}
