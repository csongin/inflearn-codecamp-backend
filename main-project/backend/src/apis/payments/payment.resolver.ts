import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.pram';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './payment.service';
import { IamportService } from '../iamport/import.service';

@Resolver()
export class PaymentResolver {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly importService: IamportService,
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Payment)
  async createPayment(
    @Args('impUid') impUid: string,
    @Args('amount') amount: number,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    // 검증 로직
    // 1. 아임포트에 요청해서 결제 완료 기록이 존재하는지 확인
    const token = await this.importService.getToken();
    this.importService.checkPaid({ impUid, amount, token });
    // 2. payment 테이블에는 impUid가 1번만 존재해야 한다.(중복 결제 방지)
    return this.paymentService.create({
      impUid,
      amount,
      currentUser,
    });
  }
}
