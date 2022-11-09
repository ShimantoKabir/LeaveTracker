import {UserPresenter} from "../presenters/UserPresenter";
import {UserRequestModel} from "./UserRequestModel";
import {IOCode} from "../../common/IOCode";
import {IOMsg} from "../../common/IOMsg";
import {Pagination} from "nestjs-typeorm-paginate";
import {UserEntity} from "../../adapter/data/entities/UserEntity";
import {LeaveEntity} from "../../adapter/data/entities/LeaveEntity";

export class UserResponseModel implements UserPresenter{

  code: number;
  msg: string;
  users: Pagination<UserEntity>;
  leaves: LeaveEntity[]

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

  buildGetAllResponse(pagination: Pagination<UserEntity> | string): Promise<UserResponseModel> {
    if (typeof pagination === "object") {
      this.code = IOCode.OK;
      this.msg = IOMsg.OK;
      this.users = pagination;
    }else {
      this.code = IOCode.ERROR;
      this.msg = pagination;
    }
    return Promise.resolve(this);
  }

  buildLeaveResponse(leaves: LeaveEntity[] | string): Promise<UserResponseModel> {
    if (typeof leaves === "object") {
      this.code = IOCode.OK;
      this.msg = IOMsg.OK;
      this.leaves = leaves;
    }else {
      this.code = IOCode.ERROR;
      this.msg = leaves;
    }
    return Promise.resolve(this);
  }

}