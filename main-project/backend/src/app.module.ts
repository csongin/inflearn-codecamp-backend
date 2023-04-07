import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // ConfigModule 추가
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './apis/auth/auth.module';
import { PaymentModule } from './apis/payments/payment.module';
import { ProductModule } from './apis/products/product.module';
import { UserModule } from './apis/users/user.module';

@Module({
  imports: [
    AuthModule,
    PaymentModule,
    ConfigModule.forRoot(), // ConfigModule 추가
    UserModule,
    ProductModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // ConfigModule 추가
      useFactory: () => ({
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: parseInt(process.env.MYSQL_PORT),
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB,
        entities: [__dirname + '/apis/**/*.entity.*'],
        synchronize: true,
        logging: true,
      }),
    }),
  ],
})
export class AppModule {}
