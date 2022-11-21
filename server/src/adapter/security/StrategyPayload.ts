import {RouteEntity} from "../data/entities/RouteEntity";

export class StrategyPayload{
  sub: number;
  email: string;
  routes: RouteEntity[];
  iat: number;
  exp: number;
}