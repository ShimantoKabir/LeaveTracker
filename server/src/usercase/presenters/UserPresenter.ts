import {UserRequestModel} from "../domains/UserRequestModel";
import {UserResponseModel} from "../domains/UserResponseModel";
import {Pagination} from "nestjs-typeorm-paginate";
import {UserEntity} from "../../adapter/data/entities/UserEntity";
import {LeaveEntity} from "../../adapter/data/entities/LeaveEntity";

export const UP = 'UP';
export interface UserPresenter{
  buildRegistrationResponse(userRequestModel : UserRequestModel) : Promise<UserResponseModel>;
  buildRoleAssignResponse(isAssigned: boolean): Promise<UserResponseModel>;
  buildGetAllResponse(pagination: Pagination<UserEntity> | string): Promise<UserResponseModel>
  buildLeaveResponse(leaves: LeaveEntity[] | string): Promise<UserResponseModel>
}