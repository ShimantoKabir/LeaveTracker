import {Controller, Inject, Post, Body, UseGuards, Request, Req} from "@nestjs/common";
import {AIB, AuthInteractorBoundary} from "../../../usercase/boundaries/AuthInteractorBoundary";
import {AuthRequestModel} from "../../../usercase/domains/AuthRequestModel";
import {AuthResponseModel} from "../../../usercase/domains/AuthResponseModel";
import {Public} from "../../security/PublicEndPoint";
import {RefreshTokenGuard} from "../../security/guards/RefreshTokenGuard";

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

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post("refresh")
  async refresh(@Request() req): Promise<AuthResponseModel> {
    return this.authInteractorBoundary.refresh(req.user.sub,req.user.email);
  }
}