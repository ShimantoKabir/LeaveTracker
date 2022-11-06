import {Body, Controller, Inject, Post} from "@nestjs/common";
import {UIB, UserInteractorBoundary} from "../../../usercase/boundaries/UserInteractorBoundary";
import {UserRequestModel} from "../../../usercase/domains/UserRequestModel";
import {UserResponseModel} from "../../../usercase/domains/UserResponseModel";
import {Public} from "../../security/PublicEndPoint";

@Controller("users")
export class UserController {

  constructor(
    @Inject(UIB)
    private readonly userInteractorBoundary: UserInteractorBoundary
  ) {
  }

  @Public()
  @Post("register")
  async register(
    @Body() userRequestModel: UserRequestModel
  ): Promise<UserResponseModel> {
    return await this.userInteractorBoundary.register(userRequestModel);
  }

  @Post("roles")
  async assignRole(
    @Body() userRequestModel: UserRequestModel
  ): Promise<UserResponseModel> {
    return await this.userInteractorBoundary.assignRole(userRequestModel);
  }
}