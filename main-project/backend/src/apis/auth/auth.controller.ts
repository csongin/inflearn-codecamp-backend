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
    | 'birthday'
    | 'phonenumber'
    | 'profileImageUrl'
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
    console.log(req);
    if (!user) {
      user = await this.userService.create({
        email: req.user.email,
        hashedPassword: req.user.password,
        name: req.user.name,
        nickname: req.user.nickname,
        birthday: req.user.birthday,
        phonenumber: req.user.phonenumber,
        profileImageUrl: req.user.profileImageUrl,
      });
    }
    this.authService.setRefreshToken({ user, res });
    res.redirect(
      'http://localhost:5500/main-project/frontend/login/index.html',
    );
  }
}
