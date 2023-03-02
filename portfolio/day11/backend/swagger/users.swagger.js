/**
 * @swagger
 * /users:
 *  post:
 *      summary: 회원가입 API
 *      tags: [Users]
 *      requestBody:
 *               required: true
 *               content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  required: true
 *                                  example: 아라
 *                              personal:
 *                                  type: string
 *                                  required: true
 *                                  example: 123456-1234567
 *                              email:
 *                                  type: string
 *                                  required: true
 *                                  example: ala@gmail.com
 *                              prefer:
 *                                  type: string
 *                                  required: true
 *                                  example: http://www.naver.com
 *                              pwd:
 *                                  type: string
 *                                  required: true
 *                                  example: 1234
 *                              phone:
 *                                  type: string
 *                                  required: true
 *                                  example: 01012345678
 *      responses:
 *          '200':
 *                  description: user의 _id 리턴
 *                  content:
 *                       application/json:
 *                          schema:
 *                            type: string
 *                            example: 61ee1b7272a81036fc429a05
 */

/**
 * @swagger
 * /users:
 *  get:
 *      summary: 회원 목록 조회 API
 *      tags: [Users]
 *      responses:
 *          '200':
 *                 description: 전체 user 목록 리턴
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
 *                                           example: 아라111
 *                                       email:
 *                                           type: string
 *                                           example: ala@gmail.com
 *                                       personal:
 *                                           type: string
 *                                           example: 220101-*******
 *                                       prefer:
 *                                           type: string
 *                                           example: https://www.naver.com
 *                                       pwd:
 *                                           type: string
 *                                           example: 1234
 *                                       phone:
 *                                           type: string
 *                                           example: 01012345678
 *                                       og:
 *                                           type: object
 *                                           properties:  
 *                                               title:
 *                                                   type: string 
 *                                                   example: 네이버
 *                                               description: 
 *                                                   type: string
 *                                                   example: 네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요
 *                                               image: 
 *                                                   type: string 
 *                                                   example: https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png
 */ 