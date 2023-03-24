import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-naver-v2';

export class JwtNaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/login/naver',
      scope: ['email', 'profile'],
    });
  }

  validate(accessToken: string, refreshToken: string, profile: Profile) {
    const user = {
      email: profile.email,
      password: '1234',
      name: profile.name,
      nickname: profile.nickname,
      gender: profile.gender,
      birthday: `${profile.birthYear}-${profile.birthday}`,
      mobile: profile.mobile,
      profileImageUrl: '',
      snsId: profile.id,
      snsType: 'naver',
      snsProfile: '',
    };
    return user;
  }
}
