import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne({ email, password }) {
    return await this.userRepository.findOne({
      where: { email, password },
    });
  }

  async create({ createUserInput }) {
    const { email, ...user } = createUserInput;
    const isEmail = await this.userRepository.findOne({ email });
    if (isEmail) {
      throw new ConflictException('이미 등록된 이메일 입니다.');
    }
    return this.userRepository.save({
      email,
      ...user,
    });
  }

  async delete({ email, password }) {
    const result = await this.userRepository.softDelete({
      email,
      password,
    });
    return result.affected ? true : false;
  }
}
