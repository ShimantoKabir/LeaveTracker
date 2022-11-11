import {Pagination} from "nestjs-typeorm-paginate";
import {RouteEntity} from "../../adapter/data/entities/RouteEntity";
import {RouteResponseModel} from "../domains/RouteResponseModel";

export const ROP = "ROP";
export interface RoutePresenter {
  buildGetOrSaveOrUpdateResponse(routeEntity: string|RouteEntity): Promise<RouteResponseModel>
  buildRemoveResponse(isRemoved: boolean): Promise<RouteResponseModel>;
  buildGetAllResponse(pagination: Pagination<RouteEntity> | string) : Promise<RouteResponseModel>;
}