import {AuthDto} from "../../AuthDto";
import {AuthDtoBuilder} from "../AuthDtoBuilder";
import {Injectable} from "@nestjs/common";
import {RouteEntity} from "../../../adapter/data/entities/RouteEntity";

@Injectable()
export class AuthDtoBuilderImpl implements AuthDtoBuilder{

  authDto = new AuthDto();

  withAuthToken(authToken: string | null): this {
    this.authDto.authToken = authToken;
    return this;
  }

  withPaths(paths: string[] | null): this {
    this.authDto.paths = paths;
    return this;
  }

  withRefreshToken(refreshToken: string | null): this {
    this.authDto.refreshToken = refreshToken;
    return this;
  }

  withRoutes(routeEntities: RouteEntity[] | null): this {
    this.authDto.routeEntities = routeEntities;
    return this;
  }

  build(): AuthDto {
    return this.authDto;
  }
}