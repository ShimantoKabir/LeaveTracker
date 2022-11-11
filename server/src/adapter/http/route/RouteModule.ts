import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {HttpModule} from "@nestjs/axios";
import {RouteEntity} from "../../data/entities/RouteEntity";
import {RouteController} from "./RouteController";
import {ROIB} from "../../../usercase/boundaries/RouteInteractorBoundary";
import {RouteInteractor} from "../../../usercase/RouteInteractor";
import {RouteResponseModel} from "../../../usercase/domains/RouteResponseModel";
import {ROP} from "../../../usercase/presenters/RoutePresenter";
import {RouteServiceImpl} from "../../data/services/implementations/RouteServiceImpl";
import {ROS} from "../../data/services/RouteService";

@Module({
  imports : [
    TypeOrmModule.forFeature([RouteEntity]),
    HttpModule
  ],
  controllers: [RouteController],
  providers: [
    {
      provide: ROIB,
      useClass: RouteInteractor
    },
    {
      provide: ROP,
      useClass: RouteResponseModel
    },
    {
      provide: ROS,
      useClass: RouteServiceImpl
    }
  ],
})
export class RouteModule{}