import {RegistrationComponentModel} from "./RegistrationComponentModel";
import {ChangeEvent, FormEvent} from "react";
import {action, makeObservable, observable} from "mobx";
import {inject, injectable} from "inversify";
import {US, UserService} from "../../../services/api/UserService";
import {AlertDto} from "../../../dtos/AlertDto";
import {MAS, MicrosoftAuthService} from "../../../services/microsoft/MicrosoftAuthService";
import {IOCode} from "../../../common/IOCode";
import {IOMsg} from "../../../common/IOMsg";
import {UDB, UserDtoBuilder} from "../../../dtos/builders/UserDtoBuilder";
import {ADB, AlertDtoBuilder} from "../../../dtos/builders/AlertDtoBuilder";

@injectable()
export class RegistrationComponentModelImpl implements RegistrationComponentModel{

	email: string = "";
	password: string = "";
	isFormValid: boolean = false;

	@inject(US)
	private readonly userService!: UserService;

	@inject(MAS)
	private readonly microsoftAuthService!: MicrosoftAuthService;

	@inject(UDB)
	private readonly userDtoBuilder!: UserDtoBuilder;

	@inject(ADB)
	private readonly alertDtoBuilder!: AlertDtoBuilder;

	constructor() {
		makeObservable(this, {
			email: observable,
			password: observable,
			isFormValid: observable,
			onInputChange: action,
			onRegistration: action,
			validateForm: action,
			registeredByMicrosoft: action
		});
	}

	onInputChange(e: ChangeEvent<HTMLInputElement>): void {
		if (e.target.id === "formBasicEmail"){
			this.email = e.target.value;
		}else if (e.target.id === "formBasicPassword"){
			this.password = e.target.value;
		}
	}

	async onRegistration(): Promise<AlertDto> {
		const user = this.userDtoBuilder.withEmail(this.email)
			.withPassword(this.password)
			.build();
		return await this.userService.register(user);
	}

	async registeredByMicrosoft(): Promise<AlertDto> {
		const user = await this.microsoftAuthService.getUserInfo();
		if (user === null){
			const alertDto = this.alertDtoBuilder.withCode(IOCode.ERROR)
				.withBody(IOMsg.ERROR_BODY)
				.withTitle(IOMsg.ERROR_HEAD)
				.withStatus(true)
				.build();
			return Promise.resolve(alertDto);
		}
		const userDto = this.userDtoBuilder.withEmail(user.email)
		.withPassword(user.password)
		.build();
		return await this.userService.register(userDto);
	}

	validateForm(e: FormEvent<HTMLFormElement>): boolean {
		e.preventDefault();
		e.stopPropagation();
		this.isFormValid = !e.currentTarget.checkValidity();
		return e.currentTarget.checkValidity();
	}

}
