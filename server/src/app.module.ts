import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./adapter/data/entities/UserEntity";
import {AuthModule} from "./adapter/http/auth/AuthModule";
import {ConfigModule} from "@nestjs/config";
import {APP_GUARD} from "@nestjs/core";
import {AuthTokenGuard} from "./adapter/security/guards/AuthTokenGuard";
import {UserModule} from "./adapter/http/user/UserModule";

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "db.sqlite",
      entities: [UserEntity],
      synchronize: true
    }),
    ConfigModule.forRoot({ isGlobal: true })
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthTokenGuard,
    },
  ]
})

export class AppModule {}
