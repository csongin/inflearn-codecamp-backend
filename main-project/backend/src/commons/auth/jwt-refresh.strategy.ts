import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        const cookie = req.headers.cookie.split('=')[1];
        return cookie;
      },
      secretOrKey: 'myRefreshKey',
    });
  }

  validate(payload) {
    console.log(payload);
    return {
      email: payload.email, //
      id: payload.sub,
    };
  }
}
