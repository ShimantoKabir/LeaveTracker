import {UserDto} from "../../dtos/UserDto";

export const MAS = "MAS";
export interface MicrosoftAuthService {
	getUserInfo() : Promise<UserDto | null>
}
