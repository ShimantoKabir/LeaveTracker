import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./adapter/data/entities/UserEntity";
import {AuthModule} from "./adapter/http/auth/AuthModule";
import {ConfigModule} from "@nestjs/config";
import {APP_GUARD} from "@nestjs/core";
import {AuthTokenGuard} from "./adapter/security/guards/AuthTokenGuard";
import {UserModule} from "./adapter/http/user/UserModule";
import {RoleEntity} from "./adapter/data/entities/RoleEntity";
import {RoleModule} from "./adapter/http/role/RoleModule";
import {LeaveEntity} from "./adapter/data/entities/LeaveEntity";
import {RouteModule} from "./adapter/http/route/RouteModule";
import {RouteEntity} from "./adapter/data/entities/RouteEntity";

@Module({
  imports: [
    AuthModule,
    UserModule,
    RoleModule,
    RouteModule,
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "db.sqlite",
      entities: [UserEntity,RoleEntity,LeaveEntity,RouteEntity],
      synchronize: true
    }),
    ConfigModule.forRoot({isGlobal: true})
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthTokenGuard,
    },
  ]
})

export class AppModule {
}
