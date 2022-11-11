import {RouteInteractorBoundary} from "./boundaries/RouteInteractorBoundary";
import {RouteRequestModel} from "./domains/RouteRequestModel";
import {RouteResponseModel} from "./domains/RouteResponseModel";
import {IPaginationOptions, Pagination} from "nestjs-typeorm-paginate";
import {Inject, Injectable} from "@nestjs/common";
import {ROS, RouteService} from "../adapter/data/services/RouteService";
import {ROP, RoutePresenter} from "./presenters/RoutePresenter";
import {IOMsg} from "../common/IOMsg";
import {RouteEntity} from "../adapter/data/entities/RouteEntity";

@Injectable()
export class RouteInteractor implements RouteInteractorBoundary{

  constructor(
    @Inject(ROS)
    private readonly routeService: RouteService,
    @Inject(ROP)
    private readonly routePresenter: RoutePresenter
  ) {
  }

  async edit(routeRequestModel: RouteRequestModel): Promise<RouteResponseModel> {
    let response : RouteEntity | string;
    try {
      const updateResult = await this.routeService.update(routeRequestModel);
      if (updateResult.affected > 0){
        response = routeRequestModel;
      }else {
        response = IOMsg.ERROR;
      }
    }catch (e) {
      response = e;
    }
    return this.routePresenter.buildGetOrSaveOrUpdateResponse(response);
  }

  async getAll(options: IPaginationOptions): Promise<RouteResponseModel> {
    let response : Pagination<RouteEntity> | string;
    try {
      response = await this.routeService.readAll(options);
    }catch (e) {
      response = e.code;
    }
    return this.routePresenter.buildGetAllResponse(response)
  }

  async getById(id: number): Promise<RouteResponseModel> {
    let response : RouteEntity | string;
    try {
      response = await this.routeService.read(id);
      if (!response){
        response = IOMsg.USER_NOT_FOUND
      }
    }catch (e) {
      response = e.code;
    }
    return this.routePresenter.buildGetOrSaveOrUpdateResponse(response);
  }

  async removeById(id: number): Promise<RouteResponseModel> {
    let isDeleted : boolean;
    try {
      isDeleted = await this.routeService.delete(id);
    }catch (e) {
      isDeleted = false;
    }
    return this.routePresenter.buildRemoveResponse(isDeleted);
  }

  async save(routeRequestModel: RouteRequestModel): Promise<RouteResponseModel> {
    let response : RouteEntity | string;
    try {
      response = await this.routeService.create(routeRequestModel);
    }catch (e) {
      response = e.code;
    }
    return this.routePresenter.buildGetOrSaveOrUpdateResponse(response);
  }

}