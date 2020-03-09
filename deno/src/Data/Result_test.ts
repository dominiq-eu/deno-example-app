/*
    Result_test.ts
*/

import { test, fail, assertEquals } from "../test_deps.ts"
import * as Result from "./Result.ts"

test(function test_result_match() {

    const okVal  = "=D"
    const errStr = "Friendly Error"

    const resOk = Result.Ok(okVal)
    Result.match(resOk)
          .ok(value => assertEquals(value, okVal))
          .error(_ => fail())

    const resErr = Result.Error(errStr)
    Result.match(resErr)
           .ok(_ => fail())
           .error(err => assertEquals(err, errStr))
})
