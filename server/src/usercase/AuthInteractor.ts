import {AuthInteractorBoundary} from "./boundaries/AuthInteractorBoundary";
import {Inject, Injectable} from "@nestjs/common";
import {AuthRequestModel} from "./domains/AuthRequestModel";
import {AuthResponseModel} from "./domains/AuthResponseModel";
import {US, UserService} from "../adapter/data/services/UserService";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {AP, AuthPresenter} from "./presenters/AuthPresenter";
import * as bcrypt from "bcrypt";
import {ROS, RouteService} from "../adapter/data/services/RouteService";
import {ADB, AuthDtoBuilder} from "../dtos/builders/AuthDtoBuilder";

@Injectable()
export class AuthInteractor implements AuthInteractorBoundary {

  constructor(
    @Inject(US)
    private readonly userService: UserService,
    @Inject(ROS)
    private readonly routeService: RouteService,
    @Inject(AP)
    private readonly authPresenter: AuthPresenter,
    @Inject(ADB)
    private readonly authDtoBuilder: AuthDtoBuilder,
    private jwtService: JwtService,
    private config: ConfigService
  ) {
  }

  async refresh(id: number, email: string): Promise<AuthResponseModel> {
    const user = await this.userService.getUserByEmail(email);
    const paths = user.role === null ? [] : await this.routeService.readByIds(user.role.pathIds);

    const tokens = await this.getTokens({
      id: id,
      email: email,
      paths: paths
    });

    const authDto = this.authDtoBuilder.withAuthToken(tokens.authToken)
      .withRefreshToken(tokens.refreshToken)
      .withPaths(paths)
      .build();

    return this.authPresenter.buildLoginOrRefreshResponse(authDto);
  }

  async login(authRequestModel: AuthRequestModel): Promise<AuthResponseModel> {

    const user = await this.userService.getUserByEmail(authRequestModel.email);

    const nullAuthDto = this.authDtoBuilder.withAuthToken(null)
      .withRefreshToken(null)
      .withPaths(null)
      .build();

    if (!user){
      return this.authPresenter.buildLoginOrRefreshResponse(nullAuthDto);
    }

    const isMatch = await bcrypt.compare(authRequestModel.password, user.password);

    if (isMatch){
      authRequestModel.id = user.id;
      authRequestModel.paths = user.role === null ? [] : await this.routeService.readByIds(user.role.pathIds);
      const tokens = await this.getTokens(authRequestModel);

      const authDto = this.authDtoBuilder.withAuthToken(tokens.authToken)
        .withRefreshToken(tokens.refreshToken)
        .withPaths(authRequestModel.paths)
        .build();

      return this.authPresenter.buildLoginOrRefreshResponse(authDto);
    }

    return this.authPresenter.buildLoginOrRefreshResponse(nullAuthDto);
  }

  async getTokens(authRequestModel: AuthRequestModel): Promise<{ authToken: string, refreshToken: string }> {
    const jwtPayload = {
      sub: authRequestModel.id,
      email: authRequestModel.email,
      paths: authRequestModel.paths
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('AT_SECRET'),
        expiresIn: this.config.get<string>('AT_SECRET_EXPIRES_IN'),
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('RT_SECRET'),
        expiresIn: this.config.get<string>('RT_SECRET_EXPIRES_IN'),
      }),
    ]);

    return {
      authToken: at,
      refreshToken: rt,
    };
  }

}