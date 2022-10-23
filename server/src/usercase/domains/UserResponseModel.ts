import {UserPresenter} from "../presenters/UserPresenter";
import {UserRequestModel} from "./UserRequestModel";

export class UserResponseModel implements UserPresenter{

  code: number;
  msg: string;

  async buildRegistrationResponse(userRequestModel: UserRequestModel): Promise<UserResponseModel> {
    this.msg = userRequestModel.msg;
    this.code = userRequestModel.code;
    return this;
  }

}