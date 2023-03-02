/**
 * @swagger
 * /tokens/phone:
 *  post:
 *      summary: 토큰 인증 요청 API
 *      tags: [Tokens]
 *      requestBody:
 *               required: true
 *               content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              phone:
 *                                  type: string
 *                                  required: true
 *                                  example: 01012345678
 *      responses:
 *          '200':
 *                  description: 핸드폰 인증 문자 전송 안내 메시지 리턴
 *                  content:
 *                       application/json:
 *                          schema:
 *                            type: string
 *                            example: 핸드폰으로 인증 문자가 전송되었습니다!
 */

/**
 * @swagger
 * /tokens/phone:
 *  get:
 *      summary: 토큰 인증 완료 API
 *      tags: [Tokens]
 *      responses:
 *          '200':
 *                 description: 토큰 인증 여부 리턴
 *                 content:
 *                       application/json:
 *                           schema:
 *                               type: boolean
 *                               example: true
 */ 