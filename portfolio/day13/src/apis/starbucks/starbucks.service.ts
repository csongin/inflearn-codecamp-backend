import { Injectable } from '@nestjs/common';

@Injectable()
export class StarbucksService {
  findAll() {
    const result = [
      {
        menu: '아메리카노',
        price: 5000,
        kcal: 5,
        saturated_fat: 0,
        protein: 0,
        salt: 0,
        sugar: 0,
        caffeine: 75,
      },
      {
        menu: '에스프레소',
        price: 5000,
        kcal: 5,
        saturated_fat: 0,
        protein: 0,
        salt: 0,
        sugar: 10,
        caffeine: 75,
      },
      {
        menu: '카페라떼',
        price: 5000,
        kcal: 5,
        saturated_fat: 0,
        protein: 0,
        salt: 5,
        sugar: 0,
        caffeine: 75,
      },
      {
        menu: '바닐라라떼',
        price: 5000,
        kcal: 5,
        saturated_fat: 0,
        protein: 20,
        salt: 0,
        sugar: 0,
        caffeine: 75,
      },
      {
        menu: '돌체라뗴',
        price: 5000,
        kcal: 5,
        saturated_fat: 10,
        protein: 0,
        salt: 0,
        sugar: 0,
        caffeine: 75,
      },
    ];
    return result;
  }

  create() {
    return '등록에 성공하였습니다.';
  }
}
