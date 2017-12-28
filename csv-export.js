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

const csv = require('csv')
const path = require('path')
const fs = require('fs')
const util = require('util')
const Error = require('verror').VError

const stringify = util.promisify(csv.stringify)
const writeFile = util.promisify(fs.writeFile)

const FOLDER_TO_EXPORT = path.join(__dirname, 'results')

async function csvExport(filename, data, opts) {
    try {
        const dataToExport = await stringify(data, opts)
        await writeFile(path.join(FOLDER_TO_EXPORT, filename), dataToExport)
    } catch (err) {
        const errOpts = {
            cause: err,
            name: 'CSVExportError'
        }
        throw Error(errOpts, `Error happened exporting csv with filename: ${filename}`)
    }
}

module.exports = {
    csvExport
}