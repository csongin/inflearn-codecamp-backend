import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class IamportService {
  // 인증 토큰 발급 받기
  async getToken() {
    try {
      const result = await axios.post(
        'https://api.iamport.kr/payments/impUid',
        {
          imp_key: process.env.IMP_KEY,
          imp_secret: process.env.IMP_SECRET,
        },
      );
      return result.data.response.access_token;
    } catch (error) {
      throw new HttpException(
        error.response.data.message,
        error.response.status,
      );
    }
  }

  async checkPaid({ impUid, amount, token }) {
    try {
      const result = await axios.get(
        `https://api.iamport.kr/payments/${impUid}`,
        {
          headers: { Authorization: token },
        },
      );
      console.log(result);
    } catch (error) {
      throw new HttpException(
        error.response.data.message,
        error.response.status,
      );
    }
  }
}
