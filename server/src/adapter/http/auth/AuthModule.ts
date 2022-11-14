import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../../data/entities/UserEntity";
import {Module} from "@nestjs/common";
import {AuthController} from "./AuthController";
import {US} from "../../data/services/UserService";
import {UserServiceImpl} from "../../data/services/implementations/UserServiceImpl";
import {AP} from "../../../usercase/presenters/AuthPresenter";
import {AuthResponseModel} from "../../../usercase/domains/AuthResponseModel";
import {AIB} from "../../../usercase/boundaries/AuthInteractorBoundary";
import {AuthInteractor} from "../../../usercase/AuthInteractor";
import {PassportModule} from "@nestjs/passport";
import {AuthTokenStrategy} from "../../security/strategies/AuthTokenStrategy";
import {JwtModule} from "@nestjs/jwt";
import {RefreshTokenStrategy} from "../../security/strategies/RefreshTokenStrategy";
import {RoleEntity} from "../../data/entities/RoleEntity";
import {RS} from "../../data/services/RoleService";
import {RoleServiceImpl} from "../../data/services/implementations/RoleServiceImpl";
import {ROS} from "../../data/services/RouteService";
import {RouteServiceImpl} from "../../data/services/implementations/RouteServiceImpl";
import {RouteEntity} from "../../data/entities/RouteEntity";
import {ADB} from "../../../dtos/builders/AuthDtoBuilder";
import {AuthDtoBuilderImpl} from "../../../dtos/builders/implementations/AuthDtoBuilderImpl";

@Module({
  imports : [
    TypeOrmModule.forFeature([UserEntity, RoleEntity, RouteEntity]),
    JwtModule.register({}),
    PassportModule
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: AIB,
      useClass: AuthInteractor
    },
    {
      provide: AP,
      useClass: AuthResponseModel
    },
    {
      provide: US,
      useClass: UserServiceImpl
    },
    {
      provide: RS,
      useClass: RoleServiceImpl
    },
    {
      provide: ROS,
      useClass: RouteServiceImpl
    },
    {
      provide: ADB,
      useClass: AuthDtoBuilderImpl
    },
    AuthTokenStrategy,
    RefreshTokenStrategy
  ],
})
export class AuthModule{}