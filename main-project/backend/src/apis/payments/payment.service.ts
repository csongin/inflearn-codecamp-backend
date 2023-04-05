import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { User } from '../users/entities/user.entity';
import {
  Payment,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/payment.entity';
@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create({ impUid, amount, currentUser }) {
    const pointTransaction = await this.paymentRepository.create({
      impUid,
      amount,
      user: currentUser.userId,
      status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    });

    await this.paymentRepository.save(pointTransaction);

    const user = await this.userRepository.findOne({ id: currentUser.userId });
    await this.userRepository.update(
      { id: user.id }, // where
      { point: user.point + amount },
    );
    return pointTransaction;
  }
}
