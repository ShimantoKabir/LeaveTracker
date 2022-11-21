import {Injectable, UnauthorizedException} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {ConfigService} from "@nestjs/config";
import {StrategyPayload} from "../StrategyPayload";
import {RouteType} from "../../../types/RouteType";

@Injectable()
export class AuthTokenStrategy extends PassportStrategy(Strategy,"AT") {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('AT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request,payload: StrategyPayload) {
    console.log(request.url);
    console.log("payload=",payload);

    const index = payload.routes.findIndex(route=>route.type === RouteType.API_ROUTE && route.path === request.url);
    if (index === -1){
      throw new UnauthorizedException();
    }
    return payload;
  }
}
