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

const Error = require('verror').VError 
const csvExport = require('./csv-export').csvExport
const bnan = require('bcrypt')
const bnapi = require('bcrypt-napi')

const REPETITION = 1000
const SALT_ROUNDS = 11
const NS_PER_SEC = 1e9
const PASSWORD = 'Y5N=j>Naxr=MZ3*j'

const columns = {
    ID: 'ID',
    SALT: 'SALT',
    PASSWORD: 'PASSWORD',
    TIME: 'TIME'
}

const opts = {
    delimeter: '\t',
    header: true,
    columns
}

async function run() {
    try {
        let napiRes = []
        for (let i = 0; i < REPETITION; i++) {
            let time = process.hrtime()
            bnapi.hashSync(PASSWORD, bnapi.genSaltSync(SALT_ROUNDS))
            let diff = process.hrtime(time)
            let total = diff[0] * NS_PER_SEC + diff[1]
            napiRes.push({
                ID: i + 1,
                SALT: SALT_ROUNDS,
                PASSWORD: PASSWORD,
                TIME: total
            })
        }
        await csvExport('napi-hash-password-sync.csv', napiRes, opts)  
        let nanRes = []
        for (let i = 0; i < REPETITION; i++) {
            let time = process.hrtime()
            bnan.hashSync(PASSWORD, bnan.genSaltSync(SALT_ROUNDS))
            let diff = process.hrtime(time)
            let total = diff[0] * NS_PER_SEC + diff[1]
            nanRes.push({
                ID: i + 1,
                SALT: SALT_ROUNDS,
                PASSWORD: PASSWORD,
                TIME: total
            })
        }
        await csvExport('nan-hash-password-sync.csv', nanRes, opts)
        process.exit(0)
    } catch (err) {
        console.error('Error during hash passowrd benchmark ...')
        console.error(err.message)
        console.error(Error.fullStack(err))
        process.exit(-1)
    } 
}


run()