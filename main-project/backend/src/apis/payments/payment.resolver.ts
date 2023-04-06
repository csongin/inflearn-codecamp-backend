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
    await this.importService.checkPaid({ impUid, amount, token });

    // 2. payment 테이블에는 impUid가 1번만 존재해야 한다.(중복 결제 방지)
    await this.paymentService.checkDuplicate({ impUid });

    return this.paymentService.create({
      impUid,
      amount,
      currentUser,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Payment)
  async cancelPayment(
    @Args('impUid') impUid: string,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    // 결제 취소 로직
    // 1, 이미 취소된 건인지 확인
    await this.paymentService.checkAlreadyCanceled({ impUid });

    // 2. 취소하기에 충분한 포인트가 있는지 확인
    await this.paymentService.checkHasCancelablePoint({ impUid, currentUser });

    // 3. 아임포트에 취소 요청하기
    const token = await this.importService.getToken();
    const canceledAmount = await this.importService.cancel({ impUid, token });

    // 4. payment 테이블에 결제 취소 등록하기
    return await this.paymentService.cancel({
      impUid,
      amount: canceledAmount,
      currentUser,
    });
  }
}
