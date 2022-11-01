import {AuthInteractorBoundary} from "./boundaries/AuthInteractorBoundary";
import {Inject, Injectable} from "@nestjs/common";
import {AuthRequestModel} from "./domains/AuthRequestModel";
import {AuthResponseModel} from "./domains/AuthResponseModel";
import {US, UserService} from "../adapter/data/services/UserService";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {AP, AuthPresenter} from "./presenters/AuthPresenter";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthInteractor implements AuthInteractorBoundary {

  constructor(
    @Inject(US)
    private readonly userService: UserService,
    @Inject(AP)
    private readonly authPresenter: AuthPresenter,
    private jwtService: JwtService,
    private config: ConfigService
  ) {
  }

  async refresh(email: string, password: string): Promise<AuthResponseModel> {
    const tokens = await this.getTokens({
      password: password,
      email: email,
      msg: "",
      code: 0
    });
    return this.authPresenter.buildLoginOrRefreshResponse(tokens.authToken,tokens.refreshToken);
  }

  async login(authRequestModel: AuthRequestModel): Promise<AuthResponseModel> {

    const user = await this.userService.getUserByEmail(authRequestModel.email);

    if (!user){
      return this.authPresenter.buildLoginOrRefreshResponse(null,null);
    }

    const isMatch = await bcrypt.compare(authRequestModel.password, user.password);

    if (isMatch){
      const tokens = await this.getTokens(authRequestModel);
      return this.authPresenter.buildLoginOrRefreshResponse(tokens.authToken,tokens.refreshToken);
    }

    return this.authPresenter.buildLoginOrRefreshResponse(null,null);
  }

  async getTokens(authRequestModel: AuthRequestModel): Promise<{ authToken: string, refreshToken: string }> {
    const jwtPayload = {
      sub: authRequestModel.email,
      email: authRequestModel.password,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('AT_SECRET'),
        expiresIn: '1m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('RT_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      authToken: at,
      refreshToken: rt,
    };
  }

}