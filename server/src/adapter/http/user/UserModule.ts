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

@Module({
  imports : [
    TypeOrmModule.forFeature([UserEntity])
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
    }
  ],
})
export class UserModule{}