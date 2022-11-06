import {IsNotEmpty, IsString} from "class-validator";

export class RoleRequestModel{
  id: number;

  @IsNotEmpty()
  @IsString()
  roleName: string;

  code: number;
  msg: string;
}