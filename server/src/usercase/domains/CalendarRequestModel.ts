import {IsDateString, IsEmail, ValidateIf} from "class-validator";

export class CalendarRequestModel{

  @IsEmail()
  @ValidateIf((object, value) => value)
  email: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}