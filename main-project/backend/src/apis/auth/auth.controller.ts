import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';

interface IOAuthUser {
  user: Pick<
    User,
    | 'email'
    | 'password'
    | 'name'
    | 'nickname'
    | 'gender'
    | 'birthday'
    | 'mobile'
    | 'profileImageUrl'
    | 'snsId'
    | 'snsType'
    | 'snsProfile'
  >;
}

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get('/login/google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    let user = await this.userService.findOne({ email: req.user.email });
    if (!user) {
      user = await this.userService.create({
        email: req.user.email,
        hashedPassword: req.user.password,
        name: req.user.name,
        nickname: req.user.nickname,
        gender: req.user.gender,
        birthday: req.user.birthday,
        mobile: req.user.mobile,
        profileImageUrl: req.user.profileImageUrl,
        snsId: req.user.snsId,
        snsType: req.user.snsType,
        snsProfile: '',
      });
    }
    this.authService.setRefreshToken({ user, res });
    res.redirect(
      'http://localhost:5500/main-project/frontend/login/index.html',
    );
  }

  @Get('/login/naver')
  @UseGuards(AuthGuard('naver'))
  async loginNaver(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    let user = await this.userService.findOne({ email: req.user.email });
    if (!user) {
      user = await this.userService.create({
        email: req.user.email,
        hashedPassword: req.user.password,
        name: req.user.name,
        nickname: req.user.nickname,
        gender: req.user.gender,
        birthday: req.user.birthday,
        mobile: req.user.mobile,
        profileImageUrl: req.user.profileImageUrl,
        snsId: req.user.snsId,
        snsType: req.user.snsType,
        snsProfile: req.user.snsProfile,
      });
    }
    this.authService.setRefreshToken({ user, res });
    res.redirect(
      'http://localhost:5500/main-project/frontend/login/index.html',
    );
  }

  @Get('/login/kakao')
  @UseGuards(AuthGuard('kakao'))
  async loginKakao(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    let user = await this.userService.findOne({ email: req.user.email });
    if (!user) {
      user = await this.userService.create({
        email: req.user.email,
        hashedPassword: req.user.password,
        name: req.user.name,
        nickname: req.user.nickname,
        gender: req.user.gender,
        birthday: req.user.birthday,
        mobile: req.user.mobile,
        profileImageUrl: req.user.profileImageUrl,
        snsId: req.user.snsId,
        snsType: req.user.snsType,
        snsProfile: req.user.snsProfile,
      });
    }
    this.authService.setRefreshToken({ user, res });
    res.redirect(
      'http://localhost:5500/main-project/frontend/login/index.html',
    );
  }
}
