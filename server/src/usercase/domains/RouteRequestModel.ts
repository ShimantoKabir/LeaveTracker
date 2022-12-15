import {IsNotEmpty, IsNumber, IsString, ValidateIf} from "class-validator";

export class RouteRequestModel{
  id: number;

  @IsNotEmpty()
  @IsString()
  path: string;

  @IsNotEmpty()
  @IsNumber()
  type: number;

  @IsNotEmpty()
  @IsString()
  @ValidateIf((object, value) => value)
  label!: string;

  code: number;
  msg: string;
}