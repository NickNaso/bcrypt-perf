/*******************************************************************************
 * Copyright (c) Nicola Del Gobbo
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the license at http://www.apache.org/licenses/LICENSE-2.0
 *
 * THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY
 * IMPLIED WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
 * MERCHANTABLITY OR NON-INFRINGEMENT.
 *
 * See the Apache Version 2.0 License for specific language governing
 * permissions and limitations under the License.
 *
 * Contributors - initial API implementation:
 * Nicola Del Gobbo <nicoladelgobbo@gmail.com>
 ******************************************************************************/

'use strict'

const express = require('express')
const body = require('body-parser')
const bnan = require('bcrypt-napi')
const bnapi = require('bcrypt')
const eh = require('errorhandler')

const SALT_ROUNDS = 10
const HASHED_PASSWORD = '$2a$10$LRMfNnzHbQfyxwXWECUDZOPw4u9uUN.NlbjuAI4PaHGiAPKhXIaU6'

const app = express()

app.use(body.json())
app.use(body.urlencoded({extended: false}))

app.use(eh())

app.post('/signup-napi', async (req, res, next) => {
    try {
        await bnapi.hash(req.body.password, await bnapi.genSalt(SALT_ROUNDS))
        res.send('OK')
    } catch (err) {
        next(err)
    }
})

app.post('/signup-nan', async (req, res, next) => {
    try {
        await bnan.hash(req.body.password, await bnan.genSalt(SALT_ROUNDS))
        res.send('OK')
    } catch (err) {
        next(err)
    }
})

app.post('/login-napi', async (req, res, next) => {
    try {
        await bnapi.compare(req.body.password, HASHED_PASSWORD)
        res.send('OK')
    } catch (err) {
        next(err)
    }
})

app.post('/login-nan', async (req, res, next) => {
    try {
        await bnan.compare(req.body.password, HASHED_PASSWORD)
        res.send('OK')
    } catch (err) {
        next(err)
    }
})

app.listen(5000, () => {
    console.log('Server started at: http://localhost:5000')
})