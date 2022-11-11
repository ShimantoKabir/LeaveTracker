import {IPaginationOptions} from "nestjs-typeorm-paginate";
import {RouteResponseModel} from "../domains/RouteResponseModel";
import {RouteRequestModel} from "../domains/RouteRequestModel";

export const ROIB = "ROIB";
export interface RouteInteractorBoundary {
  save(routeRequestModel : RouteRequestModel) : Promise<RouteResponseModel>;
  removeById(id: number) : Promise<RouteResponseModel>;
  edit(routeRequestModel: RouteRequestModel) : Promise<RouteResponseModel>
  getById(id: number) : Promise<RouteResponseModel>;
  getAll(options: IPaginationOptions) : Promise<RouteResponseModel>;
}