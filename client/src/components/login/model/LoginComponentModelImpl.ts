import {inject, injectable} from "inversify";
import {action, makeObservable, observable} from "mobx";
import {ChangeEvent, FormEvent} from "react";
import {LoginComponentModel} from "./LoginComponentModel";
import {US, UserService} from "../../../services/api/UserService";
import {AlertDto} from "../../../dtos/AlertDto";
import {IOCode} from "../../../common/IOCode";
import {IOMsg} from "../../../common/IOMsg";
import {UserDto} from "../../../dtos/UserDto";
import {UDB, UserDtoBuilder} from "../../../dtos/builders/UserDtoBuilder";
import {MAS, MicrosoftAuthService} from "../../../services/microsoft/MicrosoftAuthService";
import {ADB, AlertDtoBuilder} from "../../../dtos/builders/AlertDtoBuilder";
import {AppUtils} from "../../../common/AppUtils";

@injectable()
export class LoginComponentModelImpl implements LoginComponentModel {

	email: string = "";
	password: string = "";
	isFormValid: boolean = false;
	isLoggedIn: boolean = false;

	@inject(US)
	private readonly userService!: UserService;

	@inject(UDB)
	private readonly userDtoBuilder!: UserDtoBuilder;

	@inject(MAS)
	private readonly microsoftAuthService!: MicrosoftAuthService;

	@inject(ADB)
	private readonly alertDtoBuilder!: AlertDtoBuilder;

	constructor() {
		makeObservable(this, {
			email: observable,
			password: observable,
			isFormValid: observable,
			isLoggedIn: observable,
			onInputChange: action,
			loginByMicrosoft: action,
			onLogin: action,
			validateForm: action
		});
	}

	async onLogin(): Promise<AlertDto> {

		const userDto: UserDto = this.userDtoBuilder
			.withEmail(this.email)
			.withPassword(this.password)
			.build();

		const userDtoRes = await this.userService.login(userDto)

		const isOk = userDtoRes.code === IOCode.OK;

		if (isOk){
			AppUtils.setCookies(userDtoRes);
			this.isLoggedIn = true;
		}else {
			this.password = "";
		}

		const alertDto = this.alertDtoBuilder.withCode(userDtoRes.code)
			.withTitle(isOk ? IOMsg.SUCCESS_HEAD : IOMsg.ERROR_HEAD)
			.withStatus(!isOk)
			.withBody(userDtoRes.msg)
			.build();

		return Promise.resolve(alertDto);
	}

	async loginByMicrosoft(): Promise<AlertDto> {
		const user = await this.microsoftAuthService.getUserInfo();
		if (user === null){
			const alertDto = this.alertDtoBuilder.withCode(IOCode.ERROR)
			.withBody(IOMsg.ERROR_BODY)
			.withTitle(IOMsg.ERROR_HEAD)
			.withStatus(true)
			.build();
			return Promise.resolve(alertDto);
		}
		this.email = user.email;
		this.password = user.password;
		return await this.onLogin();
	}

	onInputChange(e: ChangeEvent<HTMLInputElement>): void {
		if (e.target.id === "formBasicEmail"){
			this.email = e.target.value;
		}else if (e.target.id === "formBasicPassword"){
			this.password = e.target.value;
		}
	}

	validateForm(e: FormEvent<HTMLFormElement>): boolean {
		e.preventDefault();
		e.stopPropagation();
		this.isFormValid = !e.currentTarget.checkValidity();
		return e.currentTarget.checkValidity();
	}
}
