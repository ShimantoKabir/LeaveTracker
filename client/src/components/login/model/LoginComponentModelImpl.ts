import {inject, injectable} from "inversify";
import {makeObservable, observable, action} from "mobx";
import {ChangeEvent, FormEvent} from "react";
import {Cookies} from "react-cookie";
import {PublicClientApplication} from "@azure/msal-browser";
import {LoginComponentModel} from "./LoginComponentModel";
import {Credential} from "../../../common/Credential";
import AppConstants from "../../../common/AppConstants";
import {resolve} from "inversify-react";
import {US, UserService} from "../../../services/api/UserService";


@injectable()
export class LoginComponentModelImpl implements LoginComponentModel {

	email: string = "";
	isFormValid: boolean = false;
	isLoggedIn: boolean = false;

	@inject(US)
	private readonly userService!: UserService;

	constructor() {
		makeObservable(this, {
			email: observable,
			isFormValid: observable,
			isLoggedIn: observable,
			onInputChange: action
		});
	}

	onLogin(e: FormEvent<HTMLFormElement>): void {

		// this.isFormValid = e.currentTarget.checkValidity();
		// let cookies = new Cookies();
		// cookies.set(
		// 	AppConstants.loggedInCookieName,
		// 	true,
		// 	{
		// 		path: '/'
		// 	}
		// );
		// this.isLoggedIn = true;
	}

	async loginByMicrosoft(): Promise<void> {

		const publicClientApplication = new PublicClientApplication({
			auth: {
				clientId: Credential.clientId,
				redirectUri: Credential.redirectUri,
				authority: Credential.authority
			}
		});

		try {
			const res = await publicClientApplication.loginPopup({
				scopes: Credential.scope,
			})
			console.log(JSON.stringify(res));
		} catch (e) {
			console.log(JSON.stringify(e));
		}
	}

	onInputChange(e: ChangeEvent<HTMLInputElement>): void {
		this.email = e.target.value;
	}
}
