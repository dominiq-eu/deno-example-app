/*
    Result_test.ts
*/

import { test, fail, assertEquals } from '../test_deps.ts'
import * as Result from './Result.ts'

test(function Result_OkErr() {
    assertEquals(Result.isOk(Result.Ok('')), true)
    assertEquals(Result.isErr(Result.Err('')), true)
})

test(function Result_caseOf() {
    const okVal = '=D'
    const errStr = 'Friendly Error'

    const resOk = Result.Ok(okVal)
    Result.caseOf(resOk)
        .error(_ => fail())
        .ok(value => assertEquals(value, okVal))

    const resErr = Result.Err(errStr)
    Result.caseOf(resErr)
        .ok(_ => fail())
        .error(err => assertEquals(err, errStr))
})
