import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RoleEntity} from "../../data/entities/RoleEntity";
import {HttpModule} from "@nestjs/axios";
import {MAS} from "../../microsoft/MicrosoftApiService";
import {MicrosoftApiServiceImpl} from "../../microsoft/implementations/MicrosoftApiServiceImpl";
import {RS} from "../../data/services/RoleService";
import {RoleServiceImpl} from "../../data/services/implementations/RoleServiceImpl";
import {RoleController} from "./RoleController";
import {RIB} from "../../../usercase/boundaries/RoleInteractorBoundary";
import {RoleInteractor} from "../../../usercase/RoleInteractor";
import {RP} from "../../../usercase/presenters/RolePresenter";
import {RoleResponseModel} from "../../../usercase/domains/RoleResponseModel";

@Module({
  imports : [
    TypeOrmModule.forFeature([RoleEntity]),
    HttpModule
  ],
  controllers: [RoleController],
  providers: [
    {
      provide: RIB,
      useClass: RoleInteractor
    },
    {
      provide: RP,
      useClass: RoleResponseModel
    },
    {
      provide: RS,
      useClass: RoleServiceImpl
    }
  ],
})
export class RoleModule{}