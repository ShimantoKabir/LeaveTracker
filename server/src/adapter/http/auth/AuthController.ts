import {Controller, Inject, Post, Body, UseGuards, Request} from "@nestjs/common";
import {AIB, AuthInteractorBoundary} from "../../../usercase/boundaries/AuthInteractorBoundary";
import {AuthRequestModel} from "../../../usercase/domains/AuthRequestModel";
import {AuthResponseModel} from "../../../usercase/domains/AuthResponseModel";
import {AuthGuard} from "@nestjs/passport";
import {AuthTokenGuard} from "../../security/guards/AuthTokenGuard";
import {Public} from "../../security/PublicEndPoint";

@Controller("auth")
export class AuthController{

  constructor(
    @Inject(AIB)
    private readonly authInteractorBoundary: AuthInteractorBoundary) {
  }

  @Public()
  @Post("login")
  async login(
    @Body() authRequestModel: AuthRequestModel
  ): Promise<AuthResponseModel> {
    return this.authInteractorBoundary.login(authRequestModel);
  }

  @Post("logout")
  async logout(@Body() authRequestModel: AuthRequestModel) {
    return authRequestModel;
  }
}