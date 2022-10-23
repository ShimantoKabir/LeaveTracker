import { AuthGuard } from '@nestjs/passport';

export class RefreshTokenGuard extends AuthGuard('RefreshTokenGuard') {
  constructor() {
    super();
  }
}