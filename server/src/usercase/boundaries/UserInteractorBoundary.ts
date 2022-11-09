import {UserRequestModel} from "../domains/UserRequestModel";
import {UserResponseModel} from "../domains/UserResponseModel";
import {CalendarRequestModel} from "../domains/CalendarRequestModel";

export const UIB = "UIB";
export interface UserInteractorBoundary{
  register(userRequestModel: UserRequestModel): Promise<UserResponseModel>
  assignRole(userRequestModel: UserRequestModel): Promise<UserResponseModel>
  getUsers(userRequestModel: UserRequestModel) : Promise<UserResponseModel>;
  fetchLeaveDetails(calendarRequestModel: CalendarRequestModel) : Promise<UserResponseModel>;
}