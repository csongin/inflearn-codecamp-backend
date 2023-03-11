import { Product } from 'src/apis/product/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  image_url: string;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  is_main: number;

  @JoinColumn()
  @ManyToOne(() => Product)
  product: Product;
}
