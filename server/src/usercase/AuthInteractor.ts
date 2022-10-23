import {AuthInteractorBoundary} from "./boundaries/AuthInteractorBoundary";
import {Inject, Injectable} from "@nestjs/common";
import {AuthRequestModel} from "./domains/AuthRequestModel";
import {AuthResponseModel} from "./domains/AuthResponseModel";
import {UserEntity} from "../adapter/data/entities/UserEntity";
import {US, UserService} from "../adapter/data/services/UserService";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AuthInteractor implements AuthInteractorBoundary {

  constructor(
    @Inject(US)
    private readonly userService: UserService,
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
    return Promise.resolve({
      authToken: tokens.authToken,
      refreshToken: tokens.refreshToken
    });
  }

  async login(authRequestModel: AuthRequestModel): Promise<AuthResponseModel> {



    const tokens = await this.getTokens(authRequestModel);
    return Promise.resolve({
      authToken: tokens.authToken,
      refreshToken: tokens.refreshToken
    });
  }

  isUserValid(authRequestModel: AuthRequestModel): Promise<UserEntity> | null {
    const userEntity = this.userService.getUserByEmail(authRequestModel.email);
    return Promise.resolve(userEntity ? userEntity : null);
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