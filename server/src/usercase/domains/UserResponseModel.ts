import {UserPresenter} from "../presenters/UserPresenter";
import {UserRequestModel} from "./UserRequestModel";
import {IOCode} from "../../common/IOCode";
import {IOMsg} from "../../common/IOMsg";

export class UserResponseModel implements UserPresenter{

  code: number;
  msg: string;

  async buildRegistrationResponse(userRequestModel: UserRequestModel): Promise<UserResponseModel> {
    this.msg = userRequestModel.msg;
    this.code = userRequestModel.code;
    return this;
  }

  buildRoleAssignResponse(isAssigned: boolean): Promise<UserResponseModel> {

    this.code = IOCode.ERROR;
    this.msg = IOMsg.ERROR;

    if (isAssigned){
      this.code = IOCode.OK;
      this.msg = IOMsg.ROLE_ASSIGNED;
    }

    return Promise.resolve(this);
  }

}