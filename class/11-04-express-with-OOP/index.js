import express from "express";
import { CashService } from './cash.js';
import { ProductService } from './product.js';

const app = express();

// 상품 구매하기
app.post("/products/buy", (req, res) => {
  // 1. 가진 돈 검증하는 코드 
  const cashService = new CashService();
  const hasMoney = cashService.checkValue(); // true or false return

  // 2. 판매여부 검증하는 코드
  const productService = new ProductService();
  const isSoldout = productService.checkSoldout(); // true or false return

  // 3. 상품 구매하는 코드
  if (hasMoney && !isSoldout) {
    res.send("상품 구매 완료!!")
  }
});

// 상품 환불하기
app.post("/products/refund", (req, res) => {
  // 1. 판매여부 검증하는 코드 (대략 10줄 정도)
  const productService = new ProductService();
  const isSoldout = productService.checkSoldout(); // true or false return

  // 2. 상품 환불하는 코드
  if (isSoldout) {
    res.send("상품 환불 완료!!")
  }
});

app.listen(3000);