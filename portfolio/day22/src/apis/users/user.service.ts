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

  async findOne({ email }) {
    return await this.userRepository.findOne({
      email,
    });
  }

  async create({
    email,
    hashedPassword: password,
    name,
    nickname,
    birthday,
    phonenumber,
    profileImageUrl,
  }) {
    const user = await this.userRepository.findOne({ email });
    if (user) {
      throw new ConflictException('이미 등록된 이메일 입니다.');
    }
    return this.userRepository.save({
      email,
      password,
      name,
      nickname,
      birthday,
      phonenumber,
      profileImageUrl,
    });
  }

  async updatePwd({ email, password }) {
    const myUser = await this.userRepository.findOne({ email });
    if (!myUser) {
      throw new ConflictException('존재하지 않는 이메일 입니다.');
    }
    const newUser = {
      email,
      password,
    };
    return await this.userRepository.save(newUser);
  }

  async delete({ email }) {
    const result = await this.userRepository.softDelete({
      email,
    });
    return result.affected ? true : false;
  }
}
