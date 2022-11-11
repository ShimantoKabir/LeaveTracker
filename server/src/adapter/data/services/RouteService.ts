import {UpdateResult} from "typeorm";
import {IPaginationOptions, Pagination} from "nestjs-typeorm-paginate";
import {RouteEntity} from "../entities/RouteEntity";

export const ROS = "ROS";
export interface RouteService{
  create(routeEntity: RouteEntity): Promise<RouteEntity>;
  update(routeEntity: RouteEntity): Promise<UpdateResult>;
  delete(id: number): Promise<boolean>;
  read(id: number): Promise<RouteEntity>;
  readAll(options: IPaginationOptions): Promise<Pagination<RouteEntity>>;
}