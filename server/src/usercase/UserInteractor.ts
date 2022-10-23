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

@Injectable()
export class UserInteractor implements UserInteractorBoundary {

  constructor(
    @Inject(US)
    private readonly userService: UserService,
    @Inject(UP)
    private readonly userPresenter: UserPresenter
  ) {
  }

  async register(userRequestModel: UserRequestModel): Promise<UserResponseModel> {
    userRequestModel.msg = IOMsg.REGISTRATION_SUCCESS;
    userRequestModel.code = IOCode.OK;

    try {

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
      console.log("error: ", e);
      userRequestModel.msg = IOMsg.REGISTRATION_UNSUCCESSFUL;
      userRequestModel.code = IOCode.ERROR;
      return this.userPresenter.buildRegistrationResponse(userRequestModel);
    }
  }

}