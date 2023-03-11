import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login_id: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  nickname: string;

  @Column()
  birthday: string;

  @Column()
  phonenumber: string;

  @Column()
  profile_image_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
