import {IsDateString, IsEmail} from "class-validator";

export class CalendarRequestModel{
  @IsEmail()
  email: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}