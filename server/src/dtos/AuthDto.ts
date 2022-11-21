import {RouteEntity} from "../adapter/data/entities/RouteEntity";

export class AuthDto{
  authToken: string|null;
  refreshToken: string|null;
  paths: string[]|null;
  routeEntities: RouteEntity[]|null;
}