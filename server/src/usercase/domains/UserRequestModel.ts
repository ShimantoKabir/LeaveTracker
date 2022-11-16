import {IsEmail, IsNotEmpty, IsNumber, ValidateIf} from "class-validator";

export class UserRequestModel{
  id: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNumber()
  @ValidateIf((object, value) => value)
  roleId?: number;

  code: number;
  msg: string;
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
}