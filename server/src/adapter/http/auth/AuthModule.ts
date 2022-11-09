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

@Module({
  imports : [
    TypeOrmModule.forFeature([UserEntity, RoleEntity]),
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
    AuthTokenStrategy,
    RefreshTokenStrategy
  ],
})
export class AuthModule{}