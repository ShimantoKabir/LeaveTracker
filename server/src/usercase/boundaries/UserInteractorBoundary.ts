import {UserRequestModel} from "../domains/UserRequestModel";
import {UserResponseModel} from "../domains/UserResponseModel";

export const UIB = "UIB";
export interface UserInteractorBoundary{
  register(userRequestModel: UserRequestModel): Promise<UserResponseModel>
  assignRole(userRequestModel: UserRequestModel): Promise<UserResponseModel>
}