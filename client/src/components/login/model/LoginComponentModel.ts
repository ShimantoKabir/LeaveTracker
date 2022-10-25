import {ChangeEvent, FormEvent} from "react";

export const LCM = "LCM";
export interface LoginComponentModel {
	email: string;
	onInputChange(e: ChangeEvent<HTMLInputElement>): void,
	loginByMicrosoft(): void,
	isFormValid: boolean;
	isLoggedIn: boolean;
	onLogin(e: FormEvent<HTMLFormElement>) : void;
}


