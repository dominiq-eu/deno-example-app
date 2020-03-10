/*
    Result_test.ts
*/

import { test, fail, assertEquals } from "../test_deps.ts"
import * as Result from "./Result.ts"

test(function Result_match() {

    const okVal  = "=D"
    const errStr = "Friendly Error"

    const resOk = Result.Ok(okVal)
    Result.match(resOk)
          .error(_ => fail())
          .ok(value => assertEquals(value, okVal))

    const resErr = Result.Err(errStr)
    Result.match(resErr)
           .ok(_ => fail())
           .error(err => assertEquals(err, errStr))
})
