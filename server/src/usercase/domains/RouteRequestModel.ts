import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class RouteRequestModel{
  id: number;

  @IsNotEmpty()
  @IsString()
  path: string;

  @IsNotEmpty()
  @IsNumber()
  type: number;

  code: number;
  msg: string;
}