import {UserInteractorBoundary} from "./boundaries/UserInteractorBoundary";
import {Inject, Injectable} from "@nestjs/common";
import {US, UserService} from "../adapter/data/services/UserService";
import {UP, UserPresenter} from "./presenters/UserPresenter";
import {UserRequestModel} from "./domains/UserRequestModel";
import {UserResponseModel} from "./domains/UserResponseModel";
import {IOMsg} from "../common/IOMsg";
import {IOCode} from "../common/IOCode";
import AppConstants from "../common/AppConstants";
import * as bcrypt from "bcrypt";
import {UserEntity} from "../adapter/data/entities/UserEntity";
import {MAS, MicrosoftApiService} from "../adapter/microsoft/MicrosoftApiService";
import {Pagination} from "nestjs-typeorm-paginate";
import {CalendarRequestModel} from "./domains/CalendarRequestModel";

@Injectable()
export class UserInteractor implements UserInteractorBoundary {

  constructor(
    @Inject(US)
    private readonly userService: UserService,
    @Inject(UP)
    private readonly userPresenter: UserPresenter,
    @Inject(MAS)
    private readonly microsoftApiService: MicrosoftApiService
  ) {
  }

  async register(userRequestModel: UserRequestModel): Promise<UserResponseModel> {
    userRequestModel.msg = IOMsg.REGISTRATION_SUCCESS;
    userRequestModel.code = IOCode.OK;

    try {

      const microsoftUserDto = await this.microsoftApiService.getUserByEmail(userRequestModel.email);

      if (microsoftUserDto === null){
        userRequestModel.msg = IOMsg.NOT_ORG_USER;
        userRequestModel.code = IOCode.ERROR;
        return this.userPresenter.buildRegistrationResponse(userRequestModel);
      }

      const user = await this.userService.getUserByEmail(userRequestModel.email);

      if (user) {
        userRequestModel.msg = IOMsg.USER_EXIST;
        userRequestModel.code = IOCode.ERROR;
        return this.userPresenter.buildRegistrationResponse(userRequestModel);
      }

      const password = await bcrypt.hash(
        userRequestModel.password,
        AppConstants.SALT_OR_ROUNDS
      );

      const userEntity: UserEntity = {
        password: password,
        email: userRequestModel.email
      };

      const res = await this.userService.save(userEntity);

      if (!res.id) {
        userRequestModel.msg = IOMsg.REGISTRATION_UNSUCCESSFUL;
        userRequestModel.code = IOCode.ERROR;
        return this.userPresenter.buildRegistrationResponse(userRequestModel);
      }

      return this.userPresenter.buildRegistrationResponse(userRequestModel);

    } catch (e) {
      userRequestModel.msg = IOMsg.REGISTRATION_UNSUCCESSFUL;
      userRequestModel.code = IOCode.ERROR;
      return this.userPresenter.buildRegistrationResponse(userRequestModel);
    }
  }

  async assignRole(userRequestModel: UserRequestModel): Promise<UserResponseModel> {
    try {
      const result = await this.userService.assignRoleToUser(userRequestModel.roleId, userRequestModel.id)
      return this.userPresenter.buildRoleAssignResponse(result.affected && result.affected > 0);
    }catch (e) {
      return this.userPresenter.buildRoleAssignResponse(false);
    }
  }

  async getUsers(userRequestModel: UserRequestModel): Promise<UserResponseModel> {
    let response : Pagination<UserEntity> | string;
    try {
      response = await this.userService.readAll({
        limit : userRequestModel.limit,
        page: userRequestModel.page
      });
      response.items.map(user=>{
        delete user.password;
        return user;
      });
    }catch (e) {
      response = e.code;
    }
    return this.userPresenter.buildGetAllResponse(response)
  }

  async fetchLeaveDetails(calendarRequestModel: CalendarRequestModel): Promise<UserResponseModel> {
    const leaves = await this.microsoftApiService.getLeavesByEmail(calendarRequestModel);
    return this.userPresenter.buildLeaveResponse(leaves);
  }
}