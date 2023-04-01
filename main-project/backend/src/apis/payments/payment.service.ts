import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { User } from '../users/entities/user.entity';
import {
  Payment,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/payment.entity';
import { IamportService } from '../iamport/import.service';
@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly iamportService: IamportService,
  ) {}

  async create({ impUid, amount, currentUser }) {
    // impUid, access_token 검증하기
    const accessToken = await this.iamportService.getToken();
    const isPayment = await this.iamportService.getPayment(impUid, accessToken);
    if (!isPayment) {
      console.log(isPayment);

      throw new UnprocessableEntityException('결제 정보가 유효하지 않습니다.');
    }
    const pointTransaction = await this.paymentRepository.create({
      impUid,
      amount,
      user: currentUser,
      status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    });

    await this.paymentRepository.save(pointTransaction);

    const user = await this.userRepository.findOne({ id: currentUser.id });

    await this.userRepository.update(
      { id: user.id }, // where
      { point: user.point + amount },
    );
    return pointTransaction;
  }
}
