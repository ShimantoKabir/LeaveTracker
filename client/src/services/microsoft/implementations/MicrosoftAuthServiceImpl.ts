import {MicrosoftAuthService} from "../MicrosoftAuthService";
import {UserDto} from "../../../dtos/UserDto";
import {PublicClientApplication} from "@azure/msal-browser";
import {Credential} from "../../../common/Credential";
import {inject, injectable} from "inversify";
import {UDB, UserDtoBuilder} from "../../../dtos/builders/UserDtoBuilder";

@injectable()
export class MicrosoftAuthServiceImpl implements MicrosoftAuthService {

	@inject(UDB)
	private readonly userDtoBuilder!: UserDtoBuilder;

	async getUserInfo(): Promise<UserDto | null> {

		let user: UserDto|null = null;

		try {
			const publicClientApplication = new PublicClientApplication({
				auth: {
					clientId: Credential.clientId,
					redirectUri: Credential.redirectUri,
					authority: Credential.authority
				}
			});

			const res = await publicClientApplication.loginPopup({
				scopes: Credential.scope,
			})

			if (res.account){
				user = this.userDtoBuilder
					.withPassword(res.account.localAccountId)
					.withEmail(res.account.username)
					.build();
				sessionStorage.clear();
			}
		} catch (e) {
			console.log("MicrosoftAuthServiceImplError=",e);
		}
		return Promise.resolve(user);
	}
}
