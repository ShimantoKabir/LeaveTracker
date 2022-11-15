import {Injectable, UnauthorizedException} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {ConfigService} from "@nestjs/config";
import {StrategyPayload} from "../StrategyPayload";

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
    const index = payload.paths.findIndex(path=>path === request.url);
    if (index === -1){
      throw new UnauthorizedException();
    }
    return payload;
  }
}
