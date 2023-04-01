import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class IamportService {
  // 인증 토큰 발급 받기
  async getToken() {
    const getToken = await axios({
      url: 'https://api.iamport.kr/users/getToken',
      // POST method
      method: 'post',
      // "Content-Type": "application/json"
      headers: { 'Content-Type': 'application/json' },
      data: {
        // REST API키
        imp_key: process.env.IMP_KEY,
        // REST API Secret
        imp_secret: process.env.IMP_SECRET,
      },
    });

    // 인증 토큰
    const { access_token } = getToken.data.response;

    return access_token;
  }

  async getPayment(impUid: string, accessToken: string) {
    const result = await axios({
      url: `https://api.iamport.kr/payments/${impUid}`,
      method: 'post', // GET method
      headers: {
        // "Content-Type": "application/json"
        'Content-Type': 'application/json',
        // 발행된 액세스 토큰
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return result ? true : false;
  }
}
