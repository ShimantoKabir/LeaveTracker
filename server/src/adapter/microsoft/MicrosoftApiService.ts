import {MicrosoftUserDto} from "../../dtos/MicrosoftUserDto";
import {CalendarRequestModel} from "../../usercase/domains/CalendarRequestModel";
import {LeaveEntity} from "../data/entities/LeaveEntity";

export const MAS = "MAS";
export interface MicrosoftApiService{
  getUserByEmail(email: string) : Promise<MicrosoftUserDto | null>
  getLeavesByEmail(calendarRequestModel: CalendarRequestModel) : Promise<LeaveEntity[] | string>
}