import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao-oauth2';

export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/login/kakao',
    });
  }

  validate(accessToken: string, refreshToken: string, profile: any) {
    const { _json } = profile;
    const user = {
      email: _json.kakao_account.email,
      password: '1234',
      name: profile.username,
      snsId: profile.id,
      snsType: 'kakao',
    };
    return user;
  }
}
