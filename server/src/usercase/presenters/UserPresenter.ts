import {UserRequestModel} from "../domains/UserRequestModel";
import {UserResponseModel} from "../domains/UserResponseModel";

export const UP = 'UP';
export interface UserPresenter{
  buildRegistrationResponse(userRequestModel : UserRequestModel) : Promise<UserResponseModel>
}