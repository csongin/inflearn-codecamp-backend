/**
 * @swagger
 * /starbucks:
 *  get:
 *      summary: 스타벅스 커피 목록 조회 API
 *      tags: [Starbucks]
 *      responses:
 *          '200':
 *                 description: DB에 저장되어 있는 커피 목록 리턴
 *                 content:
 *                       application/json:
 *                           schema:
 *                               type: array
 *                               items:
 *                                   properties:
 *                                       _id:
 *                                           type: string
 *                                           example: 61ee1b7272a81036fc429a05
 *                                       name:
 *                                           type: string
 *                                           example: 쿨 라임 피지오
 *                                       image:
 *                                           type: string
 *                                           example: https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/%5B107051%5D_20210419112151972.jpg
 */ 