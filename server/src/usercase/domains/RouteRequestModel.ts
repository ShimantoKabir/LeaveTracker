import {IsNotEmpty, IsString} from "class-validator";

export class RouteRequestModel{
  id: number;

  @IsNotEmpty()
  @IsString()
  path: string;

  code: number;
  msg: string;
}