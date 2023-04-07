import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
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

    private readonly connection: Connection,
  ) {}

  async checkDuplicate({ impUid }) {
    const result = await this.paymentRepository.findOne({ impUid });
    if (result) {
      throw new ConflictException('이미 결제가 완료되었습니다.');
    }
  }

  async checkAlreadyCanceled({ impUid }) {
    const pointTransaction = await this.paymentRepository.findOne({
      impUid,
      status: POINT_TRANSACTION_STATUS_ENUM.CANCEL,
    });
    if (pointTransaction) {
      throw new ConflictException('이미 취소되었습니다.');
    }
  }

  async checkHasCancelablePoint({ impUid, currentUser }) {
    const pointTransaction = await this.paymentRepository.findOne({
      impUid,
      user: currentUser.userId,
      status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    });
    if (!pointTransaction) {
      throw new UnprocessableEntityException('결제 내역이 존재하지 않습니다.');
    }
    const user = await this.userRepository.findOne({ id: currentUser.userId });
    if (user.point < pointTransaction.amount) {
      throw new UnprocessableEntityException('취소할 포인트가 부족합니다.');
    }
  }

  async cancel({ impUid, amount, currentUser }) {
    const pointTransaction = await this.create({
      impUid,
      amount: -amount,
      currentUser,
      status: POINT_TRANSACTION_STATUS_ENUM.CANCEL,
    });
    return pointTransaction;
  }

  async create({
    impUid,
    amount,
    currentUser,
    status = POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
  }) {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction('SERIALIZABLE');

    try {
      const pointTransaction = await this.paymentRepository.create({
        impUid,
        amount,
        user: currentUser.userId,
        status,
      });
      // await this.paymentRepository.save(pointTransaction);
      await queryRunner.manager.save(pointTransaction);

      // const user = await this.userRepository.findOne({ id: currentUser.userId });
      const user = await queryRunner.manager.findOne(
        User,
        { id: currentUser.userId },
        { lock: { mode: 'pessimistic_write' } },
      );

      // await this.userRepository.update(
      //   { id: user.id }, // where
      //   { point: user.point + amount },
      // );
      const updatedUser = this.userRepository.create({
        ...user,
        point: user.point + amount,
      });
      await queryRunner.manager.save(updatedUser);

      await queryRunner.commitTransaction();

      return pointTransaction;
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
