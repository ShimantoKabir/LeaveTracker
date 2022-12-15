import {RouteDto} from "./RouteDto";

export class UserDto{
	email!: string;
	password!: string;
	authToken!: string;
	refreshToken!: string;
	code!: number;
	msg!: string;
	routes!: RouteDto[];
}
