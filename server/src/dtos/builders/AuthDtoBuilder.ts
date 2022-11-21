import {AuthDto} from "../AuthDto";
import {RouteEntity} from "../../adapter/data/entities/RouteEntity";

export const ADB = "ADB";
export interface AuthDtoBuilder{
  withAuthToken(authToken: string|null): this;
  withRefreshToken(refreshToken: string|null): this;
  withRoutes(routeEntities: RouteEntity[]|null): this;
  withPaths(paths: string[]|null): this;
  build() : AuthDto;
}