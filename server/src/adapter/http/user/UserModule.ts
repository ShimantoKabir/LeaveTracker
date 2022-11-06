import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "@nestjs/common";
import {UserEntity} from "../../data/entities/UserEntity";
import {UserController} from "./UserController";
import {UIB} from "../../../usercase/boundaries/UserInteractorBoundary";
import {UserInteractor} from "../../../usercase/UserInteractor";
import {UP} from "../../../usercase/presenters/UserPresenter";
import {UserResponseModel} from "../../../usercase/domains/UserResponseModel";
import {US} from "../../data/services/UserService";
import UserServiceImpl from "../../data/services/implementations/UserServiceImpl";
import {MAS} from "../../microsoft/MicrosoftApiService";
import {MicrosoftApiServiceImpl} from "../../microsoft/implementations/MicrosoftApiServiceImpl";
import {HttpModule} from "@nestjs/axios";
import {RS} from "../../data/services/RoleService";
import {RoleServiceImpl} from "../../data/services/implementations/RoleServiceImpl";
import {RoleEntity} from "../../data/entities/RoleEntity";

@Module({
  imports : [
    TypeOrmModule.forFeature([UserEntity, RoleEntity]),
    HttpModule
  ],
  controllers: [UserController],
  providers: [
    {
      provide: UIB,
      useClass: UserInteractor
    },
    {
      provide: UP,
      useClass: UserResponseModel
    },
    {
      provide: US,
      useClass: UserServiceImpl
    },
    {
      provide: MAS,
      useClass: MicrosoftApiServiceImpl
    },
    {
      provide: RS,
      useClass: RoleServiceImpl
    }
  ],
})
export class UserModule{}