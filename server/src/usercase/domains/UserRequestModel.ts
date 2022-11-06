import {IsEmail, IsNotEmpty, IsNumber} from "class-validator";

export class UserRequestModel{
  id: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNumber()
  roleId?: number;

  code: number;
  msg: string;
}