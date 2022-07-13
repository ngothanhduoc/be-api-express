const express = require("express");
const { authController } = require("../../controllers");

const router = express.Router();

router.post("/register", authController.register);

router.post("/login", authController.login);

module.exports = router;

/**
 * @swagger
 * tags:
 *    name: Auth
 *    description: Authentication
 */

/**
 * @swagger
 * /auth/register:
 *  post:
 *    summary: Register as user
 *    tags: [Auth]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *                format: email
 *                description: must be unique
 *              password:
 *                type: string
 *                format: password
 *                minLength: 8
 *                description: password
 *            example:
 *              name: fake name
 *              email: fake@example.com
 *              password: password1
 *    responses:
 *      "201":
 *        description: Created successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: string
 *                    name:
 *                      type: string
 *                    email:
 *                      type: string
 *                      format: email
 *                    role:
 *                      type: string
 *                      enum: [user, admin]
 *                tokes:
 *                  type: object
 *                  properties:
 *                    access:
 *                      type: object
 *                      properties:
 *                        token:
 *                          type: string
 *                        expires:
 *                          type: string
 *                    refresh:
 *                      type: object
 *                      properties:
 *                        token:
 *                          type: string
 *                        expires:
 *                          type: string
 */

/**
 * @swagger
 * /auth/me:
 *    get:
 *      summary: Get user info
 *      tags: [Auth]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                  name:
 *                    type: string
 *                  email:
 *                    type: string
 *                    format: email
 *                  role:
 *                    type: string
 *                    enum: [user, admin]
 */
