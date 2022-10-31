import {RegistrationComponentModel} from "./RegistrationComponentModel";
import {ChangeEvent, FormEvent} from "react";
import {action, makeObservable, observable} from "mobx";
import {inject, injectable} from "inversify";
import {US, UserService} from "../../../services/api/UserService";
import {AlertDto} from "../../../dtos/AlertDto";

@injectable()
export class RegistrationComponentModelImpl implements RegistrationComponentModel{

	email: string = "";
	password: string = "";
	isFormValid: boolean = false;

	@inject(US)
	private readonly userService!: UserService;

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
		return await this.userService.register({
			email: this.email,
			password: this.password
		});
	}

	registeredByMicrosoft(): void {

	}

	validateForm(e: FormEvent<HTMLFormElement>): boolean {
		e.preventDefault();
		e.stopPropagation();
		this.isFormValid = !e.currentTarget.checkValidity();
		return e.currentTarget.checkValidity();
	}



}
