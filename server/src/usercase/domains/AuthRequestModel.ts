import {IsEmail, IsNotEmpty} from "class-validator";

export class AuthRequestModel{
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  code: number;
  msg: string;
}