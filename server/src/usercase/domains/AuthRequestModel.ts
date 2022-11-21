import {IsEmail, IsNotEmpty} from "class-validator";
import {RouteEntity} from "../../adapter/data/entities/RouteEntity";

export class AuthRequestModel{

  id?: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password?: string;

  code?: number;
  msg?: string;
  paths?: string[];
  routes?: RouteEntity[];
}