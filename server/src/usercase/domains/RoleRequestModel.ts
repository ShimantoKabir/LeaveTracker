import {IsArray, IsNotEmpty, IsString} from "class-validator";

export class RoleRequestModel{
  id: number;

  @IsNotEmpty()
  @IsString()
  roleName: string;

  @IsArray()
  pathIds: string[]

  code: number;
  msg: string;
}