import {AlertDto} from "../../dtos/AlertDto";
import {UserDto} from "../../dtos/UserDto";

export const US = "US";
export interface UserService{
	register(userDto: UserDto) : Promise<AlertDto>;
	login(userDto: UserDto): Promise<UserDto>
}
